/*
根据类型和头像来决定重定向的path
 */
export function getRedirectPath(type, avatar) {
  let path = ''

  path += type === 'boss' ? '/boss' : '/genius'
  if(!avatar) { // 如果没有头像
    path += 'info'
  }

  return path
}