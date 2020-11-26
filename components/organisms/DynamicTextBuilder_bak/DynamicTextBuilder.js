import TextBlock from "./components/TextBlock/TextBlock";
import {Divider} from "@material-ui/core";
import DynamicTextPresenter from "../DynamicTextPresenter/DynamicTextPresenter";
import {useState, useEffect} from "react";
import {updateElementData} from "./util/updateElementData";
import ComponentSelector from "./components/ComponentSelector/ComponentSelectorBlock";

const mockData = [
  {
    id: 1,
    type: "variant",
    seed: Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5),
    content: [
      '{"time":1598221279729,"blocks":[{"type":"paragraph","data":{"text":"Omdat [de temperatuur|het weer|het klimaat] in Thailand in de maanden januari t/m maart het meest aangenaam is, behoren die maanden tot de beste reistijd."}}],"version":"2.18.0"}',
      '{"time":1598221678082,"blocks":[{"type":"paragraph","data":{"text":"Je kunt het beste naar Thailand reizen in de maanden januari t/m maart. Er heerst dan een [aangenaame temperatuur|aangenaam klimaat]."}}],"version":"2.18.0"}',
      '{"time":1598221728135,"blocks":[{"type":"paragraph","data":{"text":"Januari t/m maart is de beste reistijd voor Thailand. Het is er dan heerlijk [warm|qua temperatuur|aangenaam wat het weer betreft]."}}],"version":"2.18.0"}',
      '{"time":1598221792574,"blocks":[{"type":"paragraph","data":{"text":"Omdat  in Thailand in de maanden januari t/m maart het meest aangenaam is,&nbsp;[behoren die maanden|behoort die periode] tot de beste reistijd."}}],"version":"2.18.0"}',
    ],
  },
];

const DynamicTextBuilder = function (props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData);
  }, []);

  const handleUpdateElement = (index, updatedElement) => {
    let newData = [...data];
    console.log(newData, index);
    newData.splice(index, 1, updatedElement);
    newData[index] = updatedElement;
    console.log(newData);
    //var newData = updateElementData([...data], updatedElement);
    setData(newData);
  };

  const handleAddComponent = (index, element) => {
    let newData = [...data];
    newData.splice(index, 0, element);
    for (let i = 0; i < newData.length; i++) newData[i].id = i;
    console.log(newData);
    setData(newData);
  };

  return (
    <>
      {data.map((block, key) => {
        return (
          <React.Fragment key={key}>
            {key == 0 && <ComponentSelector index={key} onAddComponent={handleAddComponent} />}
            {block.type == "variant" && <TextBlock index={key} data={block} onUpdate={handleUpdateElement} />}
            <ComponentSelector index={key + 1} onAddComponent={handleAddComponent} />
          </React.Fragment>
        );
      })}
      <br />
      <br />
      <Divider />
      <br />
      {/* <DynamicTextPresenter data={mockData} /> */}
    </>
  );
};

export default DynamicTextBuilder;
