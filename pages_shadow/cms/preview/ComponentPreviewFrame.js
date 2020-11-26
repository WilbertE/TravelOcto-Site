import {StyledComponentPreviewFrame} from "./ComponentPreviewFrame.style";
import {useState, useEffect, useRef} from "react";

const ComponentPreviewFrame = function (props) {
  const [previewWindowReady, setPreviewWindow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl("/cms/preview");
  }, []);

  useEffect(() => {
    updatePreviewWindow();
  }, [props.data, previewWindowReady]);

  const updatePreviewWindow = () => {
    if (previewWindowReady) {
      var frame = window.frames["previewWindow"];
      const frameInput = frame.contentWindow.document.getElementById("importDataSendedByParent");
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(frame.contentWindow.HTMLTextAreaElement.prototype, "value").set;
      var componentData = {component: {...props.component, data: props.data}};
      nativeInputValueSetter.call(frameInput, JSON.stringify(componentData));
      var ev = new Event("input", {bubbles: true});
      frameInput.dispatchEvent(ev);
    }
  };

  const detectIframeReady = function () {
    var iFrame = document.getElementById("previewWindow");
    var interval = setInterval(() => {
      if (iFrame.getAttribute("data-ready") != null) {
        setPreviewWindow(true);
        clearInterval(interval);
        setLoading(false);
      }
    }, 20);
  };

  return (
    <StyledComponentPreviewFrame>
      <iframe onLoad={detectIframeReady} src={url} id="previewWindow">
        {props.children}
      </iframe>
    </StyledComponentPreviewFrame>
  );
};

export default ComponentPreviewFrame;
