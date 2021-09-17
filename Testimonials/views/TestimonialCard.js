import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core"
import PropTypes from "prop-types"
import Chip from "../../Chip/Chip"
import "./TestimonialLanding.css"
import "./TestimonialCard.css"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const TestimonialCard = (props) => {
  const { data, userCategories, urlPath } = props
  const { t } = useTranslation(["common", "testimonials"])
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
    <Grid item key={data.slug}>
      <Card className="testimonial-card">
        <CardMedia
          className={
            data.media.length
              ? "testimonial-card-media"
              : "testimonial-card-media testimonial-card-media-fill"
          }
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
        <CardContent className="testimonial-card-content">
          <div className="testimonial-category-chip">
            {renderTestimonialCategories()}
            {data.is_success_story && (
              <label
                className="testimonial-category-label"
                data-cy="testimonial_card_category_label"
              >
                {t("testimonials:success.story")}
              </label>
            )}
          </div>
          <Typography data-cy="testimonial_card_quote">
            {data.is_success_story ? data.quote : data.content}
          </Typography>
        </CardContent>
        <CardActions className="testimonial-card-footer">
          <div className="testimonial-card-avatar">
            <img
              src={data.testimonial_user.image.url}
              alt={data.testimonial_user.name}
              className="testimonial-card-avatar-image"
              data-cy="testimonial_card_avatar"
            />
          </div>
          <Typography
            className="testimonial-card-user-name"
            data-cy="testimonial_card_user_name"
          >
            {data.testimonial_user.name}
          </Typography>
          {data.is_success_story && (
            <Link
              size="small"
              color="primary"
              className="testimonial-card-footer-link"
              to={{ pathname: `/testimonials/${urlPath}` }}
              data-cy="testimonial_card_success_story_link"
            >
              {t("common:read.more")}
            </Link>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

TestimonialCard.propTypes = {
  data: PropTypes.object.isRequired,
  userCategories: PropTypes.array.isRequired,
  urlPath: PropTypes.string.isRequired,
}
export default TestimonialCard
