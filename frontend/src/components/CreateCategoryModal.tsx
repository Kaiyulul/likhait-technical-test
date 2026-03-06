import React, { useState } from "react";
import { CreateCategoryData } from "../types";
import { Button, TextField } from "../vibes";

interface CreateCategoryModalProps {
  onSubmit: (data: CreateCategoryData) => Promise<void>;
  onCancel: () => void;
}

export function CreateCategoryModal({
  onSubmit,
  onCancel,
}: CreateCategoryModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeIcon = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return Array.from(trimmed).slice(0, 2).join("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      await onSubmit({ name: trimmedName, icon: icon || undefined });
      setName("");
      setIcon("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to create category",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Subscriptions"
        required
        fullWidth
      />

      <TextField
        label="Category Emoji/Icon"
        value={icon}
        onChange={(e) => setIcon(normalizeIcon(e.target.value))}
        placeholder="Type or paste an emoji"
        inputMode="text"
        maxLength={8}
        fullWidth
      />
      <div style={{ color: "#6e6b6b", fontSize: "0.75rem", marginTop: "-0.5rem" }}>
        Tip: use your OS emoji keyboard (Windows: Win + .)
      </div>

      {error && (
        <div style={{ color: "#dc1e32", fontSize: "0.875rem" }}>{error}</div>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
          {isSubmitting ? "Creating..." : "Create Category"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
