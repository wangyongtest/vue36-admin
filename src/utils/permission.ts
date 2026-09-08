import { useUserStore } from '@/stores/modules/user'

/** 是否拥有指定权限标识 */
export function hasPerm(perm: string): boolean {
  return useUserStore().permissions.includes(perm)
}

/** 是否拥有其中任意一个权限 */
export function hasAnyPerm(perms: string[]): boolean {
  const owned = useUserStore().permissions
  return perms.some((p) => owned.includes(p))
}

/** 是否拥有全部权限 */
export function hasAllPerm(perms: string[]): boolean {
  const owned = useUserStore().permissions
  return perms.every((p) => owned.includes(p))
}

/** 是否拥有指定角色 */
export function hasRole(role: string): boolean {
  return useUserStore().roles.includes(role)
}
