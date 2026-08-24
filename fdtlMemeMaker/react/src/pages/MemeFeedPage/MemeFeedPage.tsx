import { useCallback, useEffect, useRef, useState } from 'react';
import { Input, type InputChangeEvent } from '@progress/kendo-react-inputs';
import { c3Action } from '@/c3Action';
import { Meme, MemeCategoryCount } from '@/Interfaces';

const CARD_WIDTH = 340;
const CARD_HEIGHT = 220;

function authorLabel(meme: Meme): string {
  if (meme.author?.displayName) return meme.author.displayName;
  if (meme.author) return `unresolved author (id: ${meme.author.id})`;
  return 'unknown author';
}

function imageUrl(meme: Meme): string | undefined {
  return meme.template?.imageUrl ?? meme.customImageUrl;
}

function wrapCaption(ctx: CanvasRenderingContext2D, caption: string, maxWidth: number): string[] {
  const words = caption.toUpperCase().split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(attempt).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = attempt;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawCaptionLine(ctx: CanvasRenderingContext2D, line: string, y: number, fontSize: number, maxWidth: number) {
  ctx.lineWidth = fontSize / 6;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = 'black';
  ctx.strokeText(line, CARD_WIDTH / 2, y, maxWidth);
  ctx.fillStyle = 'white';
  ctx.fillText(line, CARD_WIDTH / 2, y, maxWidth);
}

function drawMemeCard(canvas: HTMLCanvasElement, img: HTMLImageElement, caption: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  const scale = Math.max(CARD_WIDTH / img.width, CARD_HEIGHT / img.height);
  const drawWidth = img.width * scale;
  const drawHeight = img.height * scale;
  ctx.drawImage(img, (CARD_WIDTH - drawWidth) / 2, (CARD_HEIGHT - drawHeight) / 2, drawWidth, drawHeight);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const maxWidth = CARD_WIDTH - 16;

  const segments = caption
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);

  if (segments.length <= 1) {
    const fontSize = 20;
    ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
    const lines = wrapCaption(ctx, caption, maxWidth).slice(0, 5);
    const lineHeight = fontSize * 1.15;
    const startY = CARD_HEIGHT - 10 - (lines.length - 1) * lineHeight;
    lines.forEach((line, i) => drawCaptionLine(ctx, line, startY + i * lineHeight, fontSize, maxWidth));
    return;
  }

  // Multiple "/"-separated clauses read as panel-by-panel captions (Gru's Plan, Flex Tape, etc.) --
  // band them evenly top-to-bottom instead of squashing everything into one block at the bottom.
  const fontSize = segments.length === 2 ? 18 : segments.length === 3 ? 16 : 13;
  ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;
  const bandHeight = CARD_HEIGHT / segments.length;

  segments.forEach((segment, i) => {
    const lines = wrapCaption(ctx, segment, maxWidth).slice(0, 2);
    const lineHeight = fontSize * 1.1;
    const bandCenterY = bandHeight * (i + 0.5);
    const startY = bandCenterY - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, j) => drawCaptionLine(ctx, line, startY + j * lineHeight, fontSize, maxWidth));
  });
}

function MemeCard({ meme }: { meme: Meme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const src = imageUrl(meme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!src) {
      if (ctx) {
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
      }
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawMemeCard(canvas, img, meme.caption);
    img.onerror = () => {
      if (ctx) {
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
      }
    };
    img.src = src;
  }, [src, meme.caption]);

  return <canvas ref={canvasRef} width={CARD_WIDTH} height={CARD_HEIGHT} className="w-full h-40 bg-secondary-weak" />;
}

export default function MemeFeedPage() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [memesLoading, setMemesLoading] = useState(true);
  const [memesError, setMemesError] = useState<string | null>(null);

  const [counts, setCounts] = useState<MemeCategoryCount[]>([]);
  const [countsError, setCountsError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Meme[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    c3Action('Meme', 'frontPageMemes', [])
      .then((rows: Meme[]) => setMemes(rows ?? []))
      .catch((err) => setMemesError(err instanceof Error ? err.message : String(err)))
      .finally(() => setMemesLoading(false));

    c3Action('Meme', 'publishedCountByCategory', [])
      .then((rows: MemeCategoryCount[]) => setCounts(rows ?? []))
      .catch((err) => setCountsError(err instanceof Error ? err.message : String(err)));
  }, []);

  const runSearch = useCallback((text: string) => {
    if (!text.trim()) {
      setSearchResults(null);
      setSearchError(null);
      return;
    }
    c3Action('Meme', 'searchPublishedByCaption', [text])
      .then((rows: Meme[]) => {
        setSearchResults(rows ?? []);
        setSearchError(null);
      })
      .catch((err) => {
        setSearchError(err instanceof Error ? err.message : String(err));
        setSearchResults(null);
      });
  }, []);

  const displayed = searchResults ?? memes;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-primary mb-1">Meme feed</h1>
      <p className="text-sm text-secondary mb-4">
        Front-page deep-fried memes, category counts, and caption search — the three tickets, live.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {countsError ? (
          <span className="text-sm text-danger">Category counts unavailable: {countsError}</span>
        ) : counts.length === 0 ? (
          <span className="text-sm text-secondary">No published categories yet.</span>
        ) : (
          counts.map((c) => (
            <span key={c.category} className="px-3 py-1 rounded-full bg-secondary-weak text-secondary text-sm">
              {c.category}: {c.publishedCount}
            </span>
          ))
        )}
      </div>

      <div className="mb-4">
        <Input
          value={search}
          onChange={(e: InputChangeEvent) => {
            const value = String(e.value ?? '');
            setSearch(value);
            runSearch(value);
          }}
          placeholder="Search published captions..."
          className="w-full"
        />
        {searchError && <p className="text-sm text-danger mt-1">Search unavailable: {searchError}</p>}
      </div>

      {memesLoading ? (
        <p className="text-secondary">Loading front-page memes...</p>
      ) : memesError ? (
        <p className="text-danger">Front page unavailable: {memesError}</p>
      ) : displayed.length === 0 ? (
        <p className="text-secondary">Nothing to show.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((meme) => (
            <div key={meme.id} className="border border-weak rounded-lg overflow-hidden bg-primary">
              <MemeCard meme={meme} />
              <div className="p-3">
                <p className="text-xs text-secondary">
                  {meme.category} · {authorLabel(meme)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
