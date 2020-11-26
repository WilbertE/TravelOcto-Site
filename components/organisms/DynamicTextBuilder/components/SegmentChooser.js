import DialogContent from "~/components/atoms/dialog/DialogContent";
const {StyledSegmentChooser} = require("./SegmentChooser.style");
import Button from "~/components/atoms/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRecoilState} from "recoil";
import {addSegmentState} from "../atoms";
import {v4 as guid} from "uuid";

const SegmentChooser = function (props) {
  const [addSegment, setAddSegment] = useRecoilState(addSegmentState);

  const handleAddSegment = (data) => {
    setAddSegment({
      parentId: props.parentId,
      segmentId: props.segmentId,
      location: props.location,
      segment: data,
    });
    props.onClose();
  };

  const buttons = [
    {
      icon: ["fal", "object-group"],
      description: "Tekst variant",
      inWrapper: false,
      data: {
        type: "linegroup",
        id: guid(),
        isWrapper: true,
        data: [
          {
            type: "line",
            isWrapper: false,
            id: guid(),
            data: [],
          },
        ],
      },
    },
    {
      icon: ["fal", "code-branch"],
      description: "Conditioneel",
      inWrapper: false,
      data: {
        type: "condition",
        id: guid(),
        isWrapper: true,
        data: [
          {
            conditions: [[{variable: "", variableProperty: "value", condition: "=", value: ""}]],
            id: guid(),
            data: [],
          },
        ],
      },
    },
    {
      icon: ["fal", "text-width"],
      description: "Text blok",
      inWrapper: true,
      data: {
        type: "text",
        id: guid(),
        data: "Vul hier je tekst in",
        isWrapper: true,
      },
    },
    {
      icon: ["fal", "layer-group"],
      description: "Opsomming",
      inWrapper: true,
      data: {
        type: "array",
        id: guid(),
        data: {
          prefixSingle: "",
          prefixMultiple: "",
          array: "",
          divider: "",
          lastDivider: "",
          suffixSingle: "",
          suffixMultiple: "",
        },
        isWrapper: true,
      },
    },
    {
      icon: ["fal", "random"],
      description: "Switch",
      inWrapper: true,
      data: {
        type: "switch",
        id: guid(),
        data: [
          {
            variableProperty: "value",
            variable: "",
            data: [
              {
                type: "case",
                condition: "=",
                value: "",
                id: guid(),
                data: [
                  {
                    type: "text",
                    id: guid(),
                    data: "Vul hier je tekst in",
                    isWrapper: true,
                  },
                ],
              },
            ],
          },
        ],
        isWrapper: true,
      },
    },
  ];

  return (
    <StyledSegmentChooser open={true} title="Voeg een segment toe" onClose={props.onClose}>
      <DialogContent bottomMargin>
        <div className="buttonWrapper">
          {buttons.map((button, key) => {
            if (button.inWrapper == props.isWrapper) {
              return (
                <Button key={key} variant="outlined" onClick={() => handleAddSegment(button.data)}>
                  <FontAwesomeIcon className="icon" icon={button.icon} />
                  <div className="label">{button.description}</div>
                </Button>
              );
            }
          })}
        </div>
      </DialogContent>
    </StyledSegmentChooser>
  );
};

export default SegmentChooser;
