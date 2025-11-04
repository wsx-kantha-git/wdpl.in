declare module "react-image-lightbox" {
  import { Component } from "react";

  interface LightboxProps {
    mainSrc: string;
    nextSrc?: string;
    prevSrc?: string;
    onCloseRequest: () => void;
    onMovePrevRequest?: () => void;
    onMoveNextRequest?: () => void;
    imageTitle?: string;
    imageCaption?: string;
    enableZoom?: boolean;
    animationDisabled?: boolean;
    wrapperClassName?: string;
    reactModalStyle?: Record<string, unknown>;
    toolbarButtons?: React.ReactNode[];
  }

  export default class Lightbox extends Component<LightboxProps> {}
}
