import NextHead from "next/head";

export default function Head(props) {
  let title = "TravelOcto",
    description = "TravelOcto",
    robots = "index, follow";


  if (props.title) title = props.title;
  if (props.description) description = props.description;
  if (props.robots) robots = props.robots;

  if (props.pageData && props.pageData.properties) {
    if (props.pageData.properties.title) title = props.pageData.properties.title;
    if (props.pageData.properties.metaDescription) description = props.pageData.properties.metaDescription;
    if (props.pageData.properties.robots) robots == props.pageData.properties.robots;
  }

  return (
    <NextHead>
      <title>{title} </title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  );
}
