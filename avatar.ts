export const getAvatarUrl = (avatarUrl: string | undefined) =>
  avatarUrl ? `${avatarUrl}?t=${Date.now()}` : "/default-avatar.png";
