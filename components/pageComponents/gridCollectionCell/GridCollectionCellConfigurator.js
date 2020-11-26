import {Grid, Tab, Tabs} from "@material-ui/core";
import {useEffect, useState} from "react";
import IconButton from "~/components/atoms/iconButton/IconButton";
import Select from "~/components/atoms/Select/Select";
import TextField from "~/components/atoms/textfield/Textfield";
import TextfieldTitle from "~/components/atoms/textfield/TextfieldTitle";
import TextfieldWithImageSelector from "~/components/atoms/textfield/TextfieldWithImageSelector";
import TextFieldWithTag from "~/components/atoms/textfield/TextFieldWithTag";
import Title from "~/components/atoms/title/Title";
import {StyledGridCollectionCellConfigurator} from "./GridCollectionCellConfigurator.style";

const GridCollectionCellConfigurator = function ({component, form, setForm, resetForm, updateForm, ...props}) {
  const [tabValue, setTabValue] = useState(0);
  const [arrayTag, setArrayTag] = useState(null);

  useEffect(() => {
    if (form.array == "") {
      setArrayTag(null);
      return;
    }
    const regex = new RegExp("{([^}]*?)}", "g");
    const rawArray = regex.exec(form.array)[1];
    setArrayTag([rawArray + "[]"]);
  }, [form.array]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddFilterGroup = () => {
    var filter = JSON.parse(JSON.stringify(form.filter));
    filter.push([{variable: "", condition: "==", value: ""}]);
    setForm({target: {name: "filter", value: filter}});
  };

  const handleAddFilter = (groupKey) => {
    var filter = JSON.parse(JSON.stringify(form.filter));
    filter[groupKey].push({variable: "", condition: "==", value: ""});
    setForm({target: {name: "filter", value: filter}});
  };

  const handleChange = (e, groupKey, filterKey) => {
    var filter = JSON.parse(JSON.stringify(form.filter));
    var filterItem = filter[groupKey][filterKey];
    filterItem[e.target.name] = e.target.value;
    setForm({target: {name: "filter", value: filter}});
  };

  const handleDelete = (groupKey, filterKey) => {
    var filter = JSON.parse(JSON.stringify(form.filter));
    filter[groupKey].splice(filterKey, 1);
    if (filter[groupKey].length == 0) filter.splice(groupKey, 1);
    console.log(filter);
    setForm({target: {name: "filter", value: filter}});
  };

  var options = [
    [form.sizeXs, "sizeXs", "mobiel"],
    [form.sizeSm, "sizeSm", "tablet"],
    [form.sizeMd, "sizeMd", "laptop"],
    [form.sizeLg, "sizeLg", "kleine monitor"],
    [form.sizeXl, "sizeXl", "grote monitor"],
  ];

  return (
    <StyledGridCollectionCellConfigurator>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Collectie configuratie" />
        <Tab label="Grid configuratie" />
      </Tabs>
      {tabValue == 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldWithTag
              mustSelectTag
              onChange={setForm}
              value={form.array}
              label="Array"
              name="array"
              tags={component.tags.map((t) => t.name)}
              allowed={["array"]}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField type="number" onChange={setForm} value={form.limit} label="Weergave limiet" name="limit" />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithTag
              mustSelectTag
              onChange={setForm}
              value={form.sortProperty}
              label="Sorteer op eigenschap"
              name="sortProperty"
              tags={arrayTag}
              allowed={["string", "number"]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              label="Sorteer methode"
              onChange={setForm}
              value={form.sortMethod}
              name="sortMethod"
              items={[
                {label: "Oplopend", value: "asc"},
                {label: "Aflopend", value: "desc"},
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Title className="filter-title" variant="h5">
              Filters
            </Title>
          </Grid>
          <Grid item xs={12}>
            {form.filter.map((filterGroup, groupKey) => {
              return (
                <div key={groupKey} className="filter-group-wrapper">
                  <div>
                    {filterGroup.map((filter, filterKey) => (
                      <FilterGroup
                        key={filterKey}
                        filter={filter}
                        tags={arrayTag}
                        groupKey={groupKey}
                        filterKey={filterKey}
                        onChange={handleChange}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                  <AddFilterButton onClick={() => handleAddFilter(groupKey)} />
                </div>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <AddFilterButton onClick={handleAddFilterGroup} />
          </Grid>
        </Grid>
      )}
      {tabValue == 1 &&
        options.map((option, key) => {
          return (
            <Grid key={key} item xs={12}>
              <Select
                label={`Grootte op ${option[2]}`}
                onChange={setForm}
                value={option[0]}
                name={option[1]}
                items={[
                  {label: "1", value: 1},
                  {label: "2", value: 2},
                  {label: "3 (4 cellen per rij)", value: 3},
                  {label: "4 (3 cellen per rij)", value: 4},
                  {label: "5", value: 5},
                  {label: "6 (2 cellen per rij)", value: 6},
                  {label: "7", value: 7},
                  {label: "8", value: 8},
                  {label: "9", value: 9},
                  {label: "10", value: 10},
                  {label: "11", value: 11},
                  {label: "12 (1 cel per rij)", value: 12},
                ]}
              />
            </Grid>
          );
        })}
    </StyledGridCollectionCellConfigurator>
  );
};

const FilterGroup = function ({groupKey, filterKey, filter, tags, onDelete, onChange, ...props}) {
  return (
    <Grid className="filter-group" container spacing={2}>
      <Grid item xs={1} className="filter-when-column">
        Wanneer:
      </Grid>
      <Grid item xs={4}>
        <TextFieldWithTag
          value={filter.variable}
          onChange={(e) => {
            onChange(e, groupKey, filterKey);
          }}
          name="variable"
          label="variabele"
          tags={tags}
          allowed={["string", "integer"]}
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          label="Conditie"
          value={filter.condition}
          name="condition"
          onChange={(e) => onChange(e, groupKey, filterKey)}
          items={[
            {label: "Gelijk is aan", value: "=="},
            {label: "Niet gelijk is aan", value: "!="},
            {label: "Kleiner is dan", value: "<"},
            {label: "Kleiner of gelijk is aan", value: "<="},
            {label: "Groter is dan", value: ">"},
            {label: "Groter of gelijk is aan", value: ">="},
          ]}
        />
      </Grid>
      <Grid item xs={3}>
        <TextFieldWithTag
          onChange={(e) => onChange(e, groupKey, filterKey)}
          value={filter.value}
          name="value"
          label="Waarde"
          tags={tags}
          allowed={["string", "integer"]}
        />
      </Grid>
      <Grid item xs={1} className="filter-remove-column">
        <IconButton onClick={() => onDelete(groupKey, filterKey)} icon={["fal", "trash-alt"]} small />
      </Grid>
    </Grid>
  );
};

const AddFilterButton = function (props) {
  return (
    <div className="add-filter-button">
      <IconButton onClick={props.onClick} className="add-button" icon={["fal", "plus"]} small />
    </div>
  );
};

export default GridCollectionCellConfigurator;
