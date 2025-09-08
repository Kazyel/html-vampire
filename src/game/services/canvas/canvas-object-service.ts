import Rectangle from '@/game/models/canvas/rectangle';
import Text from '@/game/models/canvas/text';

/**
 * TODO:
 *  Create a service for creating basic game objects
 */

class CanvasObjectService {
  public createRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): Rectangle {
    return new Rectangle(x, y, width, height);
  }

  public createText(
    x: number,
    y: number,
    text: string,
    color: string,
    fontSize: number = 16,
    fontFamily: string = 'sans'
  ): Text {
    return new Text(x, y, text, color, fontSize, fontFamily);
  }
}

export default CanvasObjectService;
