import { useSelector } from "react-redux";
import { IRootState } from "../ReduxStore/store";
import Lottie from "lottie-react";
import EmptyStore from "../assets/empty.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";

export default function Library() {
    const booksItems = useSelector((state: IRootState) => state.librarySlicer.items);
    // const { id } = useParams<{id: string}>();

    return (
        <section className=" px-20 py-12">
            <h1 className="text-5xl others-h1 py-5 font-bold mb-5">Personal Library</h1>

            <Swiper
                slidesPerView={1}
                spaceBetween={10} 
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 10 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 2, spaceBetween: 30 },
                    1180: { slidesPerView: 3, spaceBetween: 30 }, 
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <div className="flex overflow-x-scroll no-scrollbar mt-12">
                    <div className="flex">
                        {booksItems && booksItems.length > 0 ? (
                            booksItems.map((book) => {
                                const { image, title, id } = book;
                                return (
                                    <SwiperSlide key={id}>
                                        <div className="flex flex-col items-center"> 
                                            <Link to={`discover/${id}`}>
                                                <img
                                                    src={image}
                                                    alt={title}
                                                    className="md:min-w-[200px] min-w-[150px] max-h-[200px] object-contain"
                                                />
                                                <p className="text-black font-OpenSans font-semibold mt-2 text-center book-title">
                                                    {title}
                                                </p>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        ) : (
                            <Lottie animationData={EmptyStore} loop={true} className="h-[350px] w-[350px]" />
                        )}
                    </div>
                </div>
            </Swiper>
        </section>
    );
}
