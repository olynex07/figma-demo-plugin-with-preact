import { showUI, once } from '@create-figma-plugin/utilities';
import { ShowIconInEditorHandler } from './types';

export default function () {

  once<ShowIconInEditorHandler>('SHOW_ICON_IN_EDITOR', async (svgUrl: string) => {
    try {
      // Fetch the SVG data from the URL
      const response = await fetch(svgUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch SVG: ${response.statusText}`);
      }

      // Get the SVG as text
      const svgText = await response.text();
      // console.log('SVG Text:', svgText);
      if (svgText) {
        figma.closePlugin();
      }

      // Create an SVG node in Figma
      const svgNode = figma.createNodeFromSvg(svgText);
      svgNode.x = 150;
      svgNode.y = 150;
      svgNode.resize(150, 150)
      figma.currentPage.appendChild(svgNode);

      console.log('SVG created and inserted.');
    } catch (error) {
      console.error('Error creating SVG in editor:', error);
    }
  });

  showUI({
    height: 500,
    width: 350,
  });
}
