function hideExpiredCoupon() {
    var currentTime = new Date().getTime();

    $('.widget_coupon').each(function(index) {
    $(this).find('.coupon_limit .expiry-date').each(function(index) {
        let couponExpiry = new Date(Date.parse($(this).text()));
        couponExpiry.setDate(couponExpiry.getDate() + 1);

        if (currentTime >= couponExpiry.getTime()) {
        $(this).closest(".inner_item").remove();
        }
    });

    let numberOfCoupon = $(this).find('div.inner_item').length
    if (numberOfCoupon === 0) { $(this).remove() }
    });
}
