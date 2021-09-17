import React, { useEffect, useState } from "react"
import "./TestimonialDetailsPage.css"
import {
  getTestimonialBySlug,
  getTestimonials,
  getTestimonialUserCategories,
} from "@/api/testimonials"
import { Link, useParams } from "react-router-dom"
import { Container, Grid } from "@material-ui/core"
import Typography from "../../HomePage/modules/components/Typography/Typography"
import ShareBox from "@/components/Elements/ShareBox/ShareBox"
import { useTranslation } from "react-i18next"
import SimilarTestimonialsSection from "./SimilarTestimonialsSection"
import classnames from "classnames"
import Content from "../../Content/Content"

const TestimonialDetailsPage = () => {
  const { t } = useTranslation(["testimonials"])
  const { slug } = useParams()
  const testimonialUrl = window.location.href
  const [testimonialDetails, setTestimonialDetails] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [testimonialUserCategories, setTestimonialUserCategories] = useState([])

  useEffect(() => {
    const fetchTestimonialDetails = async () => {
      const response = await getTestimonialBySlug(slug)
      const result = await getTestimonials()
      const resultCategories = await getTestimonialUserCategories()
      setTestimonialDetails([response.data])
      setTestimonials(result.data)
      setTestimonialUserCategories(resultCategories.data)
    }

    fetchTestimonialDetails()
  }, [slug])

  return (
    <div className="testimonial-details-page">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} className="testimonial-details-page-go-to-back">
            <Link
              to="/testimonials"
              className="testimonial-details-page-go-to-back-link"
              data-cy="back_link"
            >
              {t("back.to.testimonials")}
            </Link>
          </Grid>
        </Grid>
        <Grid container className="testimonial-details-page-grid" spacing={5}>
          <Grid item md={3} sm={3} xs={12}>
            {testimonialDetails.map((testimonial, index) => (
              <div className="testimonial-details-image-wrapper" key={index}>
                <img
                  src={testimonial.user.image.url}
                  alt={testimonial.user.name}
                  className="testimonial-details-image"
                  data-cy="testimonial_details_image"
                />
              </div>
            ))}
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            {testimonialDetails.map((testimonial, index) => {
              return (
                <div key={index} className="testimonial-details-page-content">
                  <Typography
                    type="h2"
                    component="h2"
                    className={classnames("content-box-title")}
                    data-cy="testimonial_details_title"
                  >
                    {testimonial.user.name}
                  </Typography>
                  <Typography
                    type="p-main"
                    className="testimonial-details-about"
                    component="p"
                    data-cy="testimonial_details_about"
                  >
                    {testimonial.user.about}
                  </Typography>
                  <span
                    className="testimonial-details-info"
                    data-cy="testimonial_details_info"
                  >
                    {testimonial.user.user_category.name}
                    {testimonial.user.country.name && (
                      <span className="testimonial-details-country">
                        {testimonial.user.country.name}
                      </span>
                    )}
                  </span>
                  <div className="testimonial-details-social-links">
                    {testimonial.user.social_media.map((socialMedia, i) => (
                      <a
                        key={i}
                        href={socialMedia.link}
                        target="_blank"
                        rel="noreferrer"
                        data-cy="testimonial_details_social_media"
                      >
                        <img
                          className="footer-social-media-icon"
                          src={`/images/svg/footer-${socialMedia.name}.svg`}
                          data-cy="social_media_icon"
                        />
                      </a>
                    ))}
                  </div>
                  <Content className="testimonial-details-content">
                    {testimonial.content}
                  </Content>
                  {testimonial.img && (
                    <img
                      src={testimonial.img}
                      alt={testimonial.quote}
                      className="testimonial-details-content-image"
                      data-cy="testimonial_details_content_image"
                    />
                  )}
                </div>
              )
            })}
          </Grid>
          <Grid item md={3} sm={3} xs={12}>
            <ShareBox
              title={testimonialDetails.quote}
              content={testimonialDetails.content}
              url={testimonialUrl}
              className="testimonial-details-page-share-box"
            />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <SimilarTestimonialsSection
          testimonials={testimonials}
          userCategories={testimonialUserCategories}
          currentTestimonial={slug}
        />
      </Container>
    </div>
  )
}

export default TestimonialDetailsPage
