import Configurable from "../Configurable";
import TabsConfigurator from "./TabsConfigurator";
import Title from "~/components/atoms/title/Title";
import Text from "~/components/atoms/text/Text";
import {Grid} from "@material-ui/core";
import {StyledTabs} from "./Tabs.style";
import MuiTabs from "@material-ui/core/Tabs";
import MuiTab from "@material-ui/core/Tab";
import {useState} from "react";
import {searchTag} from "~/util/retrieveJsonProperty";
import ComponentRender from "../ComponentRender";

const Tabs = function (props) {
  if (props.liveMode == false) {
    return (
      <>
        <Configurable preview={false} component={props.component} title="Tabs" configurator={<TabsConfigurator />}>
          <Component {...props} />
        </Configurable>
      </>
    );
  } else {
    return <Component {...props} />;
  }
};

const Component = function ({component, ...props}) {
  const data = component.data;

  if (component.data.array) {
    const array = component.data.array.replace("{", "").replace("}", "");
    if (component.tags.filter((x) => x.name == array + "[]").length == 0) {
      component.tags.push({
        customInput: "",
        input: "",
        name: array + "[]",
      });
    }
  }

  if (data.dynamic) return <DynamicTabs component={component} {...props} />;
};

const TabPanel = function ({children, value, index, ...props}) {
  return (
    <div role="tabpanel" hidden={value !== index} aria-labelledby={`wrapped-tab-${index}`} {...props}>
      {value === index && children}
    </div>
  );
};

const DynamicTabs = function ({component, ...props}) {
  const [tabValue, setValue] = useState(0);

  const data = component.data;

  return (
    <StyledTabs>
      {(props.liveMode == false || data.showWithOneItem || (props.liveMode != false && component.apiData.length > 1)) && (
        <>
          <MuiTabs value={tabValue}>
            {data.title == "" && <MuiTab label="Tab 1" />}
            {data.title != "" && props.liveMode == false && <MuiTab value={0} label={data.title} />}
            {data.title != "" &&
              props.liveMode != false &&
              component.apiData.map((item, key) => {
                var strippedTitle = data.title
                  .replace(data.array.replace("{", "").replace("}", "") + "[].", "")
                  .replace("{", "")
                  .replace("}", "");
                var value = searchTag(item, [strippedTitle]);
                return <MuiTab onClick={() => setValue(key)} key={key} label={searchTag(item, [strippedTitle])} />;
              })}
          </MuiTabs>
          {props.liveMode == false && (
            <TabPanel className="tabpanel-cms" value={tabValue} index={0}>
              <ComponentRender parent={component} component={component.children} />
            </TabPanel>
          )}
          {props.liveMode != false &&
            component.children.map((child, key) => {
              return (
                <TabPanel key={key} className="tabpanel" value={tabValue} index={key}>
                  {child.map((childComponent, childKey) => {
                    return <ComponentRender key={childKey} parent={component} apiData={component.apiData} component={childComponent} />;
                  })}
                </TabPanel>
              );
            })}
        </>
      )}
      {props.liveMode != false && (data.showWithOneItem || (component.apiData && component.apiData.length == 1)) && (
        <>
          {component.children.map((child, key) => {
            return child.map((childComponent, childKey) => {
              return <ComponentRender key={childKey} parent={component} apiData={component.apiData} component={childComponent} />;
            });
          })}
        </>
      )}
    </StyledTabs>
  );
};

export default Tabs;
