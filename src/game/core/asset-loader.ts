class AssetLoader {
  private images: Map<string, HTMLImageElement>;
  private ready: Promise<void>;

  constructor() {
    this.images = new Map();
    this.ready = this.load();
  }

  private async load() {
    const assets = [
      { key: 'bullet', src: '/assets/weapons/bullet.png' },
      { key: 'powerup_0', src: '/assets/powerups/powerup_0.png' },
      { key: 'powerup_1', src: '/assets/powerups/powerup_1.png' },
      { key: 'powerup_2', src: '/assets/powerups/powerup_2.png' },
      { key: 'flat_frame_default', src: '/assets/ui/flat_frame_default.png' },
    ];

    await Promise.all(
      assets.map(({ key, src }) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();

          img.src = src;

          img.onload = () => {
            this.images.set(key, img);
            resolve();
          };

          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
      })
    );
  }

  public async whenReady() {
    return this.ready;
  }

  public getImage(key: string) {
    return this.images.get(key);
  }
}

export default AssetLoader;
