import React from "react"
import "./SimilarTestimonialsSection.css"
import TestimonialCard from "./TestimonialCard"
import PropTypes from "prop-types"
import { Grid } from "@material-ui/core"
import ContentBox from "../../ContentBox/ContentBox"
import { useTranslation } from "react-i18next"

const SimilarTestimonialsSection = (props) => {
  const { t } = useTranslation(["testimonials", "common"])
  const { testimonials, currentTestimonial, userCategories } = props
  const testimonialsList = testimonials
    .filter((testimonial) => testimonial.slug !== currentTestimonial)
    .splice(0, 3)
  return (
    <section className="similar-testimonials-section">
      <Grid container spacing={4} className="similar-testimonials-intro">
        <Grid md={6} sm={8} xs={12}>
          <ContentBox
            caption={t("testimonials:similar.items.title")}
            captionColor="blue"
            content={t("testimonials:similar.items.content")}
            title={t("testimonials:similar.items.big.title")}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} className="testimonial-card-container">
        {testimonialsList.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            data={testimonial}
            userCategories={userCategories}
            urlPath={testimonial.slug}
          />
        ))}
      </Grid>
    </section>
  )
}

SimilarTestimonialsSection.propTypes = {
  testimonials: PropTypes.array.isRequired,
  currentTestimonial: PropTypes.string,
  userCategories: PropTypes.array.isRequired,
}

export default SimilarTestimonialsSection
