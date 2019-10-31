import { AccountBookFill } from '@ant-design/icons';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons/lib/helpers';

interface HelperRenderOptions {
  placeholders?: {
    primaryColor?: string; // default #333
    secondaryColor?: string; // default #E6E6E6
  };
  extraSVGAttrs?: {
    [key: string]: string;
  };
}

interface AbstractNode {
  tag: string;
  attrs: {
    [key: string]: string;
  };
  children?: AbstractNode[];
}

interface ThemeType {
  theme: string;
}

interface IconDefinition {
  name: string; // kebab-case-style
  theme: ThemeType;
  icon:
    | ((primaryColor: string, secondaryColor: string) => AbstractNode)
    | AbstractNode;
}

export const svgHTMLString = (
  extraSVGAttrs = { width: '1em', height: '1em', fill: 'currentColor' },
) =>
  renderIconDefinitionToSVGElement(AccountBookFill, {
    extraSVGAttrs,
  });
