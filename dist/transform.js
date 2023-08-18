export function applyTransforms(results, options) {
    return results;
}
export function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = Math.round(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStar;
    const stars = "★".repeat(fullStars) + "☆".repeat(halfStar) + "☆".repeat(emptyStars);
    return stars;
}
//# sourceMappingURL=transform.js.map