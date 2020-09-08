import React from "react";
import PropTypes from "prop-types";

var html = `
  <div class="s-item-container">
    <div class="a-row a-spacing-top-micro a-spacing-micro">
      <div class="a-row sx-badge-region">
        <div class="a-row a-badge-region">
          <a id="BESTSELLER_B07STGGQ18"
             href="/gp/bestsellers/pc/229189/ref=sr_bs_0_229189_1"
             class="a-badge"
             aria-labelledby="BESTSELLER_B07STGGQ18-label BESTSELLER_B07STGGQ18-supplementary"
             data-a-badge-supplementary-position="right"
             data-a-badge-type="status"><span
            id="BESTSELLER_B07STGGQ18-label" class="a-badge-label"
            data-a-badge-color="sx-orange" aria-hidden="true"><span
            class="a-badge-label-inner a-text-ellipsis"><span
            class="a-badge-text"
            data-a-badge-color="sx-cloud">Best Seller</span></span></span><span
            id="BESTSELLER_B07STGGQ18-supplementary"
            class="a-badge-supplementary-text a-text-ellipsis"
            aria-hidden="true">in Computer CPU Processors</span></a></div>
      </div>
    </div>
    <div class="a-row a-spacing-base">
      <div aria-hidden="true" class="a-column a-span12 a-text-left">
        <div
          class="a-section a-spacing-none a-inline-block s-position-relative">
          <a class="a-link-normal a-text-normal" width="160" height="160"></a>
          <div class="a-section a-spacing-none a-text-center"></div>
        </div>
      </div>
    </div>
    <div class="a-row a-spacing-mini">
      <div class="a-row a-spacing-none"><a
        class="a-link-normal s-access-detail-page s-color-twister-title-link a-text-normal"
        title="AMD Ryzen 5 3600 6-Core, 12-Thread Unlocked Desktop Processor with Wraith Stealth Cooler"
        href="https://www.amazon.com/AMD-Ryzen-3600-12-Thread-Processor/dp/B07STGGQ18/ref=lp_16225009011_1_5?s=electronics&amp;ie=UTF8&amp;qid=1596851584&amp;sr=1-5">
        <h2
          data-attribute="AMD Ryzen 5 3600 6-Core, 12-Thread Unlocked Desktop Processor with Wraith Stealth Cooler"
          data-max-rows="0"
          class="a-size-base s-inline s-access-title a-text-normal">AMD
          Ryzen 5 3600 6-Core, 12-Thread Unlocked Desktop Processor with
          Wraith Stealth Cooler</h2></a></div>
      <div class="a-row a-spacing-none"><span
        class="a-size-small a-color-secondary">by </span><span
        class="a-size-small a-color-secondary">AMD</span></div>
    </div>
    <div class="a-row a-spacing-none"><span class="a-size-small">Ships to China</span>
    </div>
    <div class="a-row a-spacing-mini">
      <div class="a-row a-spacing-none"><a
        class="a-link-normal a-text-normal"
        href="https://www.amazon.com/AMD-Ryzen-3600-12-Thread-Processor/dp/B07STGGQ18/ref=lp_16225009011_1_5?s=electronics&amp;ie=UTF8&amp;qid=1596851584&amp;sr=1-5"><span
        class="a-price" data-a-size="l" data-a-color="base"><span
        class="a-offscreen">$174.99</span><span aria-hidden="true"><span
        class="a-price-symbol">$</span><span class="a-price-whole">174<span
        class="a-price-decimal">.</span></span><span
        class="a-price-fraction">99</span></span></span></a><span
        class="a-letter-space"></span><span
        aria-label="Suggested Retail Price: $199.00"
        class="a-size-base-plus a-color-secondary a-text-strike">$199.00</span>
      </div>
      <div class="a-row a-spacing-none">
        <div class="a-row a-spacing-none"><span
          class="a-size-small a-color-secondary">Available to ship in 1-2 days</span>
        </div>
      </div>
      <div class="a-row a-spacing-none">
        <div class="a-row a-spacing-mini"></div>
        <span
          class="a-size-small a-color-secondary">More Buying Choices</span>
      </div>
      <div class="a-row a-spacing-none"><a
        class="a-size-small a-link-normal a-text-normal"
        href="https://www.amazon.com/gp/offer-listing/B07STGGQ18/ref=lp_16225009011_1_5_olp?s=electronics&amp;ie=UTF8&amp;qid=1596851584&amp;sr=1-5"><span
        class="a-color-secondary a-text-strike"></span><span
        class="a-size-base a-color-base">$173.99</span><span
        class="a-letter-space"></span>(44 used &amp; new offers)</a>
      </div>
    </div>
    <div class="a-row a-spacing-none"><span name="B07STGGQ18">
    <span class="a-declarative" data-action="a-popover"><a
      href="javascript:void(0)" class="a-popover-trigger a-declarative"><i
      class="a-icon a-icon-star a-star-5"><span class="a-icon-alt">4.8 out of 5 stars</span></i><i
      class="a-icon a-icon-popover"></i></a></span></span>
      <a class="a-size-small a-link-normal a-text-normal"
         href="https://www.amazon.com/AMD-Ryzen-3600-12-Thread-Processor/dp/B07STGGQ18/ref=lp_16225009011_1_5?s=electronics&amp;ie=UTF8&amp;qid=1596851584&amp;sr=1-5#customerReviews">4,111</a>
    </div>
  </div>
`;

const HtmlContent = ({ title, pageView }) => {
  return <div id="page-view__html-content" dangerouslySetInnerHTML={{__html: html }} />
};

HtmlContent.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The pageViews dataset.
   */
  pageView: PropTypes.object
};

HtmlContent.defaultProps = {
  title: "PageView",
  pageView: {
    id: 1,
    date: "3 days ago",
    author: {
      image: require("../../images/avatars/1.jpg"),
      name: "John Doe",
      url: "#"
    },
    post: {
      title: "Hello World!",
      url: "#"
    },
    body: "Well, the way they make shows is, they make one show ..."
  }
};

export default HtmlContent;
