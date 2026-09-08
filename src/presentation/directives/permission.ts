import type { Directive } from 'vue'
import { hasPerm, hasAnyPerm } from '@/utils/permission'

/**
 * v-auth 按钮级权限指令
 * 用法：<a-button v-auth="'system:user:add'">新增</a-button>
 *       <a-button v-auth="['system:user:add','system:user:edit']">新增/编辑</a-button>
 * 无权限时移除节点。
 */
const auth: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const value = binding.value
    const allowed = Array.isArray(value) ? hasAnyPerm(value) : hasPerm(value)
    if (!allowed) {
      el.parentNode?.removeChild(el)
    }
  },
}

export default auth
