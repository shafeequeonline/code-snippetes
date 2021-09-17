'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getTestimonialBySlug(ctx) {
    const testimonials = await strapi.query('testimonials')
      .model.query((qb) => {
        qb.where('slug', ctx.params.slug);
      })
      .fetch({
        withRelated: ['media', 'testimonial_user.image', 'testimonial_user.country', 'testimonial_user.user_category']
      })
      .then((testimonial) => {
        const testimonialData = testimonial.toJSON();
        return {
          id: testimonialData.id,
          img: testimonialData.media && testimonialData.media[0] && testimonialData.media[0].url,
          quote: testimonialData.quote,
          content: testimonialData.content,
          is_success_story: testimonialData.is_success_story,
          slug: testimonialData.slug,
          user: testimonialData.testimonial_user,
        }
      })
    return testimonials;
  },
};
