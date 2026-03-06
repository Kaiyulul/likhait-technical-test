/**
 * Emoji mappings for expense categories
 */

export const CATEGORY_EMOJIS: Record<string, string> = {
  Food: "🍔",
  Transportation: "🚗",
  Entertainment: "🎬",
  Shopping: "🛍️",
  Bills: "📄",
  Healthcare: "🏥",
  Education: "📚",
  Travel: "✈️",
  Other: "📦",
};

const ICON_TOKENS: Record<string, string> = {
  "icon-food": CATEGORY_EMOJIS.Food,
  "icon-transport": CATEGORY_EMOJIS.Transportation,
  "icon-fun": CATEGORY_EMOJIS.Entertainment,
  "icon-shop": CATEGORY_EMOJIS.Shopping,
  "icon-bills": CATEGORY_EMOJIS.Bills,
  "icon-health": CATEGORY_EMOJIS.Healthcare,
  "icon-education": CATEGORY_EMOJIS.Education,
  "icon-travel": CATEGORY_EMOJIS.Travel,
  "icon-other": CATEGORY_EMOJIS.Other,
};

export function resolveCategoryIcon(icon?: string | null): string | null {
  if (!icon) return null;
  return ICON_TOKENS[icon] || icon;
}

export function buildCategoryEmojiMap(
  categories: Array<{ name: string; icon?: string | null }>,
): Record<string, string> {
  return categories.reduce(
    (acc, category) => {
      const icon = resolveCategoryIcon(category.icon);
      if (icon) {
        acc[category.name] = icon;
      }
      return acc;
    },
    { ...CATEGORY_EMOJIS },
  );
}

