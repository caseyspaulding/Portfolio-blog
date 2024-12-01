export const gtmPageView = ( rest ) =>
{
  window.dataLayer?.push( {
    event: "page_view",
    url: window.location.href,
    ...rest,
  } );
};