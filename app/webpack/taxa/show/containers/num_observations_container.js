import { connect } from "react-redux";
import LeaderItem from "../components/leader_item";

function mapStateToProps( state ) {
  const count = state.observations.total;
  const taxon = state.taxon.taxon;
  const props = {
    iconClassName: "fa fa-binoculars",
    className: "NumObservations",
    name: "?",
    linkText: I18n.t( "observations" )
  };
  if ( !count ) {
    return props;
  }
  return Object.assign( props, {
    name: count,
    linkUrl: `/observations?taxon_id=${taxon.id}`
  } );
}

const NumObservationsContainer = connect(
  mapStateToProps
)( LeaderItem );

export default NumObservationsContainer;