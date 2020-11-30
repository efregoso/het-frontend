import AcsPopulationProvider from "./variables/AcsPopulationProvider";
import VariableProvider from "./variables/VariableProvider";
import CovidProvider from "./variables/CovidProvider";
import DiabetesProvider from "./variables/DiabetesProvider";

// TODO consider making this an enum instead of a type literal, since these will
// be used throughout the code base and an enum provides a little more explicit
// clarity.
export type VariableId =
  | "diabetes_count"
  | "diabetes_per_100k"
  | "population"
  | "population_pct"
  | "covid_deaths_per_100k"
  | "covid_cases_per_100k"
  | "covid_death_count";

const acsProvider = new AcsPopulationProvider(
  "population",
  "Population",
  "Population"
);

// TODO I think this needs restructuring, so that one provider can provide
// multiple variables, each with their own ids and descriptions. This allows
// variables that naturally come together like "population" and "population_pct"
// to be provided by the same getData() call.
const providers: VariableProvider[] = [
  new CovidProvider(
    "covid_death_count",
    "Confirmed Covid19 Deaths",
    "Number of people who have died of Covid19",
    acsProvider
  ),
  new CovidProvider(
    "covid_deaths_per_100k",
    "Confirmed Covid19 deaths per 100k people",
    "Number of people who have died of Covid19 per 100k population",
    acsProvider
  ),
  new CovidProvider(
    "covid_cases_per_100k",
    "Confirmed Covid19 cases per 100k people",
    "Number of people who have been diagnosed with Covid19 per 100k population",
    acsProvider
  ),
  new DiabetesProvider(
    "diabetes_count",
    "Diabetes Count",
    "Number of people with diabetes"
  ),
  new DiabetesProvider(
    "diabetes_per_100k",
    "Diabetes Per 100k",
    "Number of people with diabetes per 100k population"
  ),
  new AcsPopulationProvider(
    "population_pct",
    "Population Percent",
    "Percentage of population"
  ),
  acsProvider,
];

// TODO I don't know why Typescript is complaining that it's missing properties.
// It seems to expect all possible values for VariableId to be present.
const variableProviders: Record<
  VariableId,
  VariableProvider
> = Object.fromEntries(providers.map((p) => [p.variableId, p])) as Record<
  VariableId,
  VariableProvider
>;

export default variableProviders;