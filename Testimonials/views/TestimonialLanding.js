import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Grid, Typography } from "@material-ui/core"
import classnames from "classnames"
import { useTranslation } from "react-i18next"
import { getTestimonials, getTestimonialUserCategories } from "@/api/testimonials"
import ContentBox from "@/components/Elements/ContentBox/ContentBox"
import TestimonialCard from "./TestimonialCard"
import "./TestimonialLanding.css"
import TestimonialCarouselCard from "./TestimonialCarouselCard"
import Masonry from "react-masonry-css"

const TestimonialLanding = () => {
  const [titles, setTitles] = useState([{ id: 0, name: "All", color: "green" }])
  const [selectedCategory, setSelectedCategory] = useState(titles[0])
  const [testimonials, setTestimonials] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [testimonialUserCategories, setTestimonialUserCategories] = useState([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      const result = await getTestimonials()
      const resultCategories = await getTestimonialUserCategories()

      if (result && result.data && result.data.length) {
        setTestimonials(result.data)
        const currentTitles = [...titles, ...resultCategories.data]
        setTestimonialUserCategories(resultCategories.data)
        setTitles(currentTitles)
      }
    }

    fetchTestimonials()
    setShowAll(true)
  }, [])

  const changeCategory = (title) => {
    setSelectedCategory(title)
    title.id === 0 ? setShowAll(true) : setShowAll(false)
  }

  const { t } = useTranslation(["training", "common"])

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3500,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  }

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <>
      <div className="testimonial-carousel-container">
        <Grid container className="testimonial-slider-container">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <TestimonialCarouselCard
                key={testimonial.id}
                data={testimonial}
                userCategories={testimonialUserCategories}
                urlPath={testimonial.slug}
              />
            ))}
          </Slider>
        </Grid>
      </div>

      <Grid md={9} sm={9} xs={12}>
        <ContentBox
          caption={t("testimonials:title")}
          captionColor="blue"
          content={t("testimonials:title.content")}
          title={t("testimonials:big.title")}
        />
      </Grid>
      <Grid container className="testimonials-titles-bar-container">
        {titles.map((titleBarItem) => (
          <Grid
            key={titleBarItem.id}
            className={classnames(
              "testimonials-titles-bar-item",
              selectedCategory === titleBarItem && "active"
            )}
            onClick={() => changeCategory(titleBarItem)}
          >
            <Typography
              type="p-title"
              component="p"
              data-cy="testimonials_landing_category_bar"
            >
              {titleBarItem.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {showAll
          ? testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                data={testimonial}
                userCategories={testimonialUserCategories}
                urlPath={testimonial.slug}
              />
            ))
          : testimonials
              .filter(
                (testimonial) =>
                  testimonial.testimonial_user.user_category === selectedCategory.id
              )
              .map((selectedTestimonial) => (
                <TestimonialCard
                  key={selectedTestimonial.id}
                  data={selectedTestimonial}
                  userCategories={testimonialUserCategories}
                  urlPath={selectedTestimonial.slug}
                />
              ))}
      </Masonry>
    </>
  )
}

export default TestimonialLanding
