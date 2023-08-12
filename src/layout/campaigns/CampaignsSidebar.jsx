import React from 'react'

function CampaignsSidebar() {
    return (
        <div className="large-sidebar">
            <div className="btn-filled text-center max-w-80 mb-4">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>plus icon</title>
                    <path
                        d="M8 3.33337V12.6667"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                    <path
                        d="M3.3335 8H12.6668"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></path>
                </svg>
                <span>Create Contact</span>
            </div>

            <div className="sidebar-title">This is a list of contacts</div>

            <div className="item">
                <div>
                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                        >
                            <title>category icon</title>
                            <path
                                d="M12.6667 6H3.33333C2.59695 6 2 6.65122 2 7.45455V12.5455C2 13.3488 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.3488 14 12.5455V7.45455C14 6.65122 13.403 6 12.6667 6Z"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M3.5 4L12.5 4"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M4.5 2L11.5 2"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                    <div className="text ml-2">Segments</div>
                </div>
                <div className="right">
                    <span>2</span>
                    <svg
                        className="ml-1 h-16 w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                    >
                        <title>chevron right icon</title>
                        <path
                            d="M6 12L10 8L6 4"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* <div className="item">
          <div>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
              >
                <title>stage icon</title>
                <path
                  d="M8 13.3333V6.66667"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12 13.3333V2.66667"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M4 13.3333V10.6667"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            <div className="text ml-2">Categories</div>
          </div>
          <div className="right">
            <span>28</span>
            <svg
              className="ml-1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              className="h-16 w-16"
            >
              <title>chevron right icon</title>
              <path
                d="M6 12L10 8L6 4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div> */}

            <div className="item">
                <div>
                    <div className="icon">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>globe icon</title>
                            <path
                                d="M8.49978 2.02011V2.39877C8.49978 2.62144 8.59844 2.83211 8.76978 2.97477L9.48178 3.56811C9.77644 3.81411 9.83844 4.24144 9.62578 4.56144L9.28578 5.07211C9.10063 5.34958 8.82828 5.55742 8.51178 5.66277L8.41644 5.69477C8.30887 5.73074 8.21104 5.79102 8.13054 5.87093C8.05004 5.95084 7.98904 6.04822 7.95229 6.15553C7.91553 6.26283 7.904 6.37717 7.9186 6.48965C7.93319 6.60213 7.97352 6.70974 8.03644 6.80411C8.28244 7.17411 8.14911 7.67544 7.75178 7.87411L5.99978 8.75011L6.28178 9.45611C6.33865 9.5995 6.34159 9.75865 6.29004 9.90404C6.2385 10.0494 6.13597 10.1712 6.00148 10.2467C5.86699 10.3223 5.70966 10.3465 5.55868 10.3149C5.4077 10.2833 5.27331 10.1979 5.18044 10.0748L4.72778 9.47077C4.65106 9.36854 4.54949 9.2876 4.4327 9.23566C4.31591 9.18371 4.18779 9.16247 4.06048 9.17396C3.93318 9.18545 3.81093 9.22928 3.70533 9.3013C3.59973 9.37331 3.51428 9.47112 3.45711 9.58544L2.99978 10.5001L2.59178 10.6021M8.49978 2.02077C7.44581 1.93233 6.3872 2.12406 5.4312 2.57654C4.47521 3.02902 3.65581 3.72616 3.05604 4.59733C2.45627 5.46849 2.09743 6.48272 2.0159 7.53724C1.93437 8.59177 2.13304 9.6491 2.59178 10.6021M8.49978 2.02077C9.5449 2.10794 10.5489 2.46752 11.4118 3.06368C12.2746 3.65984 12.9661 4.47175 13.4173 5.41846C13.8686 6.36518 14.0638 7.41364 13.9835 8.45932C13.9032 9.505 13.5502 10.5114 12.9598 11.3781M12.9598 11.3781L12.8418 11.0254C12.7421 10.7268 12.5511 10.467 12.2956 10.283C12.0402 10.099 11.7333 10 11.4184 10.0001H10.9998L10.7838 9.78411C10.6753 9.67542 10.5425 9.5941 10.3964 9.54684C10.2503 9.49957 10.095 9.48773 9.9434 9.51228C9.79181 9.53683 9.64822 9.59707 9.52449 9.68803C9.40076 9.77899 9.30043 9.89807 9.23178 10.0354L9.20778 10.0841C9.1423 10.2152 9.0503 10.3312 8.9376 10.4249C8.8249 10.5185 8.69397 10.5877 8.55311 10.6281L7.89311 10.8161C7.52644 10.9208 7.29711 11.2841 7.35978 11.6608L7.40844 11.9528C7.46178 12.2688 7.73511 12.5001 8.05511 12.5001C8.61911 12.5001 9.12044 12.8614 9.29844 13.3968L9.44178 13.8254M12.9591 11.3788C12.1272 12.5989 10.8751 13.4699 9.44178 13.8254M9.44178 13.8254C8.10346 14.157 6.69179 14.0175 5.44424 13.4305C4.19669 12.8434 3.18938 11.8446 2.59178 10.6021M10.4998 6.00011C10.4998 6.59744 10.2378 7.13344 9.82244 7.50011"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </div>
                    <div className="text ml-2">Lists</div>
                </div>
                <div className="right">
                    <span>28</span>
                    <svg
                        className="ml-1 h-16 w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                    >
                        <title>chevron right icon</title>
                        <path
                            d="M6 12L10 8L6 4"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="btn-outline text-center max-w-80">Explore more</div>
        </div>
    )
}

export default CampaignsSidebar