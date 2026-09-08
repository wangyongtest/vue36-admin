/** 基础值对象（领域层共享内核）：按结构相等比较 */
export abstract class BaseValueObject {
  equals(other: unknown): boolean {
    return JSON.stringify(this) === JSON.stringify(other)
  }
}
