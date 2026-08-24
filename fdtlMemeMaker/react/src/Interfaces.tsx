/*
 * Copyright 2009-2026 C3 AI (www.c3.ai). All Rights Reserved.
 * Confidential and Proprietary C3 Materials.
 * This material, including without limitation any software, is the confidential trade secret and proprietary
 * information of C3 and its licensors. Reproduction, use and/or distribution of this material in any form is
 * strictly prohibited except as set forth in a written license agreement with C3 and/or its authorized distributors.
 * This material may be covered by one or more patents or pending patent applications.
 */

import { ReactElement } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
  firstName: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
}

export interface SnackbarMessage {
  message: ReactElement;
  key: number;
  severity?: 'success' | 'info' | 'warning' | 'error';
  error?: boolean;
}

export interface MemeAuthor {
  id: string;
  displayName: string;
  handle: string;
}

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
}

export interface Meme {
  id: string;
  caption: string;
  category: 'Wholesome' | 'Cursed' | 'DeepFried';
  status: 'Draft' | 'Published' | 'Archived';
  postedAt: string;
  author?: MemeAuthor;
  template?: MemeTemplate;
  customImageUrl?: string;
}

export interface MemeCategoryCount {
  category: string;
  publishedCount: number;
}
