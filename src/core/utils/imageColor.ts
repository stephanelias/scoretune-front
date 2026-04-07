/**
 * Extracts the average color from an image URL
 * Returns a CSS-compatible RGB color string
 */
export const getAverageColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      // Use small canvas for better performance
      canvas.width = 50;
      canvas.height = 50;
      
      ctx.drawImage(img, 0, 0, 50, 50);
      
      const imageData = ctx.getImageData(0, 0, 50, 50);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      const pixelCount = data.length / 4;
      
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);
      
      resolve(`rgb(${r}, ${g}, ${b})`);
    };
    
    img.onerror = () => {
      // Fallback to default color if image fails to load
      resolve('rgb(83, 83, 83)'); // Spotify-like gray
    };
    
    img.src = imageUrl;
  });
};

/**
 * Creates a gradient background string for hero sections
 */
export const createHeroGradient = (color: string): string => {
  return `linear-gradient(to bottom, ${color} 0%, rgba(18, 18, 18, 1) 100%)`;
};
