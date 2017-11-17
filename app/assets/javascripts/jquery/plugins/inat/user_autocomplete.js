$.fn.userAutocomplete = function( options ) {
  options = options || { };
  if( !options.idEl ) { return; }
  var field = this;

  field.template = function( item ) {
    var wrapperDiv = $( "<div/>" ).addClass( "ac" ).attr( "id", item.id );
    var labelDiv = $( "<div/>" ).addClass( "ac-label" );
    labelDiv.append( item.html );
    wrapperDiv.append( labelDiv );
    return wrapperDiv;
  };

  field.genericAutocomplete( _.extend( options, {
    source: function( request, response ) {
      $.ajax({
      url: "/people/search.json",
        dataType: "json",
        cache: true,
        data: {
          q: request.term,
          per_page: 10,
          order: "activity"
        },
        success: function( data ) {
          response( _.map( data, function( r ) {
            r.user_id = r.id;
            r.id = r.login;
            r.title = r.login;
            return r;
          }));
        }
      });
    }
  }));

  if ( $( options.idEl ).val( ) ) {
    $.ajax( {
      url: "/users/" + $( options.idEl ).val( ) + ".json",
      dataType: "json",
      data: {
        locale: I18n.locale,
        preferred_place_id: PREFERRED_PLACE ? PREFERRED_PLACE.id : null
      },
      success: function( data ) {
        data.title = data.login;
        field.trigger( "assignSelection", data );
      }
    } );
  }
};
