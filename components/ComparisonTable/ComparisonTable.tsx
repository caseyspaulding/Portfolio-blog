import React from 'react';

const ComparisonTable = () =>
{
  // Data structure to hold product names and their corresponding logo URLs
  const products = [
    {
      name: 'EventJacket',
      logo: 'https://www.eventjacket.com/images/logo_Icon.png',
    },
    {
      name: 'EventBrite',
      logo: '/images/eventbrite.png',
    },
    {
      name: 'TicketLeap',
      logo: '/images/tl.jpg',
    },
  ];

  // Data structure for features, pricing, etc.
  const sections = [
    {
      category: 'Comparison Table',
      rows: [
        {
          label: 'Company',
          values: [ 'EventJacket', 'EventBrite', 'TicketLeap' ],
        },
      ],
    },
    {
      category: 'Pricing',
      rows: [
        {
          label: 'Monthly Fee',
          values: [ 'None', '$39.99', 'None' ],
        },
        {
          label: 'App Fee',
          values: [ '25 cents per ticket', '3.7% + $1.79 service fee per ticket', '$1 + 2% of the ticket price' ],
        },
        {
          label: 'Payment Processing Fee',
          values: [ '2.9% plus 30 cents (Stripe)', ' 2.9% payment processing', '3% payment processing' ],
        },
      ],
    },
    {
      category: 'Features',
      rows: [
        {
          label: 'CRM Included',
          values: [ 'No', 'No', 'No' ],
        },
        {
          label: 'Ticket Scanner',
          values: [ 'Yes', 'Yes', 'Yes' ],
        },
        {
          label: 'Support',
          values: [ '24/7 support, onboarding, knowledge base', 'Basic support, no onboarding', 'Basic support, no onboarding' ],
        },
      ],
    },
    // Add more categories and rows here...
  ];

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 py-10 sm:py-10">
        <div className="max-w-screen-xl px-2 mx-auto lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-2xl dark:bg-gray-900 sm:rounded-lg">
            {/* Header Section */ }
            <div className="flex flex-col items-start justify-between p-4 space-y-3 dark:bg-gray-800 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              <h5 className="mr-3 font-semibold dark:text-white">Compare Products</h5>
            </div>

            {/* Divider */ }
            <div className="mx-4 dark:mx-0 border-t dark:border-gray-700"></div>

            {/* Table Section */ }
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 dark:text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3"></th>
                    {/* Render product logos */ }
                    { products.map( ( product ) => (
                      <th key={ product.name } scope="col" className="px-4 py-3">
                        <div className="text-lg flex flex-col items-start"> {/* Changed align to start */ }
                          <img
                            src={ product.logo }
                            alt={ product.name }
                            className="max-h-32 w-auto object-contain"
                          />
                        </div>
                      </th>
                    ) ) }
                  </tr>
                </thead>

                <tbody>
                  { sections.map( ( section, sectionIndex ) => (
                    <React.Fragment key={ `section-${ sectionIndex }` }>
                      {/* Section header */ }
                      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th
                          colSpan={ 4 }
                          className="px-4 py-3 font-medium text-gray-900 dark:text-white"
                        >
                          { section.category }
                        </th>
                      </tr>
                      {/* Rows */ }
                      { section.rows.map( ( row, rowIndex ) => (
                        <tr key={ `row-${ sectionIndex }-${ rowIndex }` } className="border-b dark:border-gray-700">
                          <th className="px-4 py-3 font-normal whitespace-nowrap">
                            { row.label }
                          </th>
                          { row.values.map( ( value, valueIndex ) => (
                            <td
                              key={ `value-${ sectionIndex }-${ rowIndex }-${ valueIndex }` }
                              className="px-4 py-3 font-bold text-gray-900 dark:text-white"
                            >
                              {/* Split the value by a custom separator to insert line breaks */ }
                              { value.split( ', ' ).map( ( line, lineIndex ) => (
                                <React.Fragment key={ lineIndex }>
                                  { line }
                                  <br />
                                </React.Fragment>
                              ) ) }
                            </td>
                          ) ) }
                        </tr>
                      ) ) }
                    </React.Fragment>
                  ) ) }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ComparisonTable;
