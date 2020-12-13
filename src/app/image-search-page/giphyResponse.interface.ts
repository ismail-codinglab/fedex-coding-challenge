export interface GiphyResponse {
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  data: Array<GiphyItem>;
}

export interface GiphyItem {
  type: string;
  id: string;
  url: string;
  images: {
    original: GiphyImageObject;
    preview: GiphyImageObject;
    preview_gif: GiphyImageObject;
    preview_webp: GiphyImageObject;
    // .. and more
  };
}

interface GiphyImageObject {
  height: string;
  width: string;
  size: string;
  url: string;
}
