<script setup>
import BaseIcon from './ui/BaseIcon.vue'
import photoWide from '@/assets/images/save-spot.webp'
import photoCompact from '@/assets/images/save-spot-compact.webp'
</script>

<template>
  <section class="save" aria-labelledby="save-title">
    <div class="save__body">
      <h2 id="save-title" class="save__title">Save your spot today!</h2>

      <div class="save__text">
        <p>
          Every unicorn starts as a single star.<br />
          Together they become the Northern Lights.
        </p>
        <p>
          Welcome to Uzbekistan, where visionary government support and a thriving innovation
          ecosystem help founders turn bold ideas into global ventures.
        </p>
        <p>
          Here, startups and tech companies don&rsquo;t just become part of the Northern
          Lights&mdash;they discover their North Star and follow it all the way to international
          success.
        </p>
      </div>

      <a class="save__cta" href="#register">
        Register now
        <BaseIcon name="arrow-up-right" :size="24" />
      </a>
    </div>

    <picture class="save__figure">
      <source :srcset="photoWide" media="(min-width: 1024px)" />
      <img
        :src="photoCompact"
        alt="Speaker on stage at ICT Week with a full auditorium"
        width="1232"
        height="700"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </section>
</template>

<style lang="scss" scoped>
.save {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 36px 36px 36px 42px;
  border-radius: $r-xl;
  background: $c-card;

  @include below-desktop { flex-direction: column-reverse; gap: 24px; padding: 20px; }
  @include mobile {
    gap: 20px;
    padding: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: $r-lg;
  }
}

.save__figure {
  flex: 0 0 567px;

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 567 / 412;
    border-radius: $r-md;
    object-fit: cover;
  }

  @include below-desktop {
    flex: none;
    width: 100%;

    img { aspect-ratio: 616 / 350; }
  }

  @include mobile {
    img { aspect-ratio: 326 / 180; border-radius: 8px; }
  }
}

.save__body {
  display: flex;
  flex: 0 1 603px;
  flex-direction: column;
  gap: 24px;

  @include below-desktop { flex: none; width: 100%; gap: 20px; }
}

.save__title {
  color: $c-heading;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;

  @include tablet { font-size: 36px; line-height: 43.2px; }
  @include mobile { font-size: 26px; font-weight: 800; line-height: 31.2px; }
}

.save__text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 500;
  line-height: 28.8px;

  @include tablet { font-size: 16px; line-height: 25.6px; }
  @include mobile { gap: 6px; font-size: 14px; line-height: 22.4px; }
}

.save__cta {
  @include btn-solid;
  gap: 4px;
  align-self: flex-start;
  height: 52px;
  padding: 0 16px 0 20px;
  font-size: 18px;
  line-height: 32px;

  @include tablet { height: 54px; padding: 0 24px; }
  @include mobile { justify-content: center; width: 100%; height: 48px; font-size: 16px; }
}
</style>
