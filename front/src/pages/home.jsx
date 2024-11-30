import React from "react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { PageTitle, Footer } from "@/widgets/layout";
import { featuresData } from "@/data";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                9.11 패치
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                기다리고 기다리던 네온 너프.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-64 bg-white px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuresData.map(({ color, title, icon, description, link }) => (
                            <Link to={link} key={title}>
                                <Card
                                    color={color}
                                    className="shadow-lg opacity-80 hover:scale-105 hover:shadow-2xl transform transition-transform duration-300"
                                >
                                    <CardBody className="flex flex-col items-center justify-center">
                                        <div
                                            className="mb-4 flex items-center justify-center bg-white rounded-full w-12 h-12 hover:bg-gray-200 transition-colors duration-300"
                                        >
                                            <img
                                                src={icon}
                                                alt="icon"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
                                        <p className="text-center text-sm text-gray-300 font-light text-gray-300">{description}</p>
                                    </CardBody>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
        </>
    );
}

export default Home;
