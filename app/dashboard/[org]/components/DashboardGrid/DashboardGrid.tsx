import React from 'react';

interface Card
{
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  amount: string | number;
  href: string;
}

interface DashboardCardGridProps
{
  cards: Card[];
}

const DashboardCardGrid: React.FC<DashboardCardGridProps> = ( { cards } ) =>
{
  return (
    <div className="my-5">
      <div className="  ">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Render each card dynamically */ }
          { cards.map( ( card ) => (
            <div key={ card.name } className="overflow-hidden rounded-lg bg-white shadow-xl">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">{ card.name }</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{ card.amount }</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href={ card.href } className="font-medium text-cyan-700 hover:text-cyan-900">
                    View all
                  </a>
                </div>
              </div>
            </div>
          ) ) }
        </div>
      </div>
    </div>
  );
};

export default DashboardCardGrid;
