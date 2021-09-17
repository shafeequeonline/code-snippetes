import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import Chip from "../../Chip/Chip"
import "./TestimonialLanding.css"
import "./TestimonialCarousel.css"
import { useTranslation } from "react-i18next"

const TestimonialCarouselCard = (props) => {
  const { data, userCategories, urlPath } = props
  const { t } = useTranslation(["common"])
  const renderTestimonialCategories = () => {
    const categories = userCategories.filter(
      (category) => category.id === data.testimonial_user.user_category
    )
    return categories.map((category) => {
      return (
        <Chip
          key={category.id}
          label={category.name}
          color={category.color}
          theme="white"
          size="small"
          style={{ marginRight: 15, marginBottom: 20 }}
          data-cy="testimonial_category"
        />
      )
    })
  }

  return (
    <Grid container key={data.id} className="testimonial-carousel-wrapper">
      <Grid item xs={12} sm={8} md={8}>
        <Card className="testimonial-carousel-card">
          <CardContent className="testimonial-carousel-card-content">
            <div className="testimonial-category-chip">
              {renderTestimonialCategories()}
            </div>
            <Typography
              className="testimonial-carousel-title"
              data-cy="testimonial_quote"
            >
              “{data.quote}”
            </Typography>
            <CardActions className="testimonial-carousel-footer">
              <div className="testimonial-carousel-card-avatar">
                <img
                  src={data.testimonial_user.image.url}
                  alt={data.testimonial_user.name}
                  className="testimonial-carousel-card-avatar-image"
                  data-cy="testimonial_image"
                />
              </div>
              <Typography
                className="testimonial-carousel-user-name"
                data-cy="testimonial_user_name"
              >
                {data.testimonial_user.name}
              </Typography>
              {data.is_success_story && (
                <Link
                  size="small"
                  color="primary"
                  className="testimonial-carousel-footer-link"
                  to={{ pathname: `/testimonials/${urlPath}` }}
                  data-cy="testimonial_link"
                >
                  {t("read.more")}
                </Link>
              )}
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        className="testimonial-carousel-card-image-wrapper"
      >
        <CardMedia
          className="testimonial-carousel-card-media"
          image={
            data.media.length ? data.media[0].url : data.testimonial_user.image.url
          }
          title={
            data.media.length
              ? data.media[0].alternativeText
              : data.testimonial_user.name
          }
          data-cy="testimonial_card_media"
        />
      </Grid>
    </Grid>
  )
}

TestimonialCarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
  userCategories: PropTypes.array.isRequired,
  urlPath: PropTypes.string.isRequired,
}
export default TestimonialCarouselCard
