
export default function (opts) {
  let defaultOpts = {
    linkClass: 'cl-link', // 所有目录项都有的类
    linkActiveClass: 'cl-link-active', // active的目录项
    datasetName: 'data-cata-target', // 目录项DOM的attribute存放对应目录的id
    selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // 按优先级排序
    activeHook: null, // 激活时候回调
  }

  const Opt = Object.assign({}, defaultOpts, opts)


  let $content = document.getElementById(Opt.contentEl) // 内容获取区
  if (!$content.innerHTML) {
    let time = setInterval(() => {
      $content = document.getElementById(Opt.contentEl)
      if ($content.innerHTML) {
        clearInterval(time)
        callback()
      }
    }, 10)
  }
  let $catalog = null;
  let allCatalogs = null;
  let tree = null;

  function callback() {
    $catalog = document.getElementById(Opt.catalogEl) // 目录容器
    allCatalogs = $content.querySelectorAll(Opt.selector.join())
    tree = getCatalogsTree(allCatalogs)
    try {
      $catalog.innerHTML = `<div class='cl-wrapper'>${generateHtmlTree(tree, { id: -1 })}</div>`
    } catch (e) {
      console.error('error in catalog', e)
    }
    // 注册点击、滚动事件
    $catalog.addEventListener('click', clickHandler)
    window.addEventListener('scroll', throttle(scrollHandler, 50))
  }

  // 防抖动函数
  function debounce(fn, delay) {
    let timeout = null
    return function () {
      if (timeout != null) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(fn, delay)
    }
  }

  // 防节流函数
  function throttle(fn, delay) {
    let prev = Date.now()
    return function () {
      let now = Date.now()
      if (now - prev > delay) {
        fn()
        prev = Date.now()
      }
    }
  }
  // 滚动事件处理函数
  function scrollHandler(el) {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    //目录固定
    if (scrollTop > 850) {
      $catalog.parentNode.classList.add('article-nav-fix')
    } else {
      $catalog.parentNode.classList.remove('article-nav-fix')
    }
    let scrollToEl = null
    for (let i = allCatalogs.length - 1; i >= 0; i--) {
      if (allCatalogs[i].offsetTop <= scrollTop) {
        scrollToEl = allCatalogs[i]
        break
      }
    }
    if (scrollToEl) setActiveItem(scrollToEl.id)
    else setActiveItem(null) // 找不到无匹配的元素
  }

  /**
   * 点击事件处理函数
   */

  function clickHandler({
    target
  }) {
    const datasetId = target.getAttribute(Opt.datasetName)
    target.classList.contains(Opt.linkClass) &&
      window.scrollTo(0, document.getElementById(datasetId).offsetTop + 10)
  }

  /**
   * 获取目录树，生成类似于Vnode的树
   * @param catalogs
   */
  function getCatalogsTree(catalogs) {
    let title, tagName, tree = [],
      treeItem = {},
      parentItem = {
        id: -1
      },
      lastTreeItem = null,
      id

    for (let i = 0; i < catalogs.length; i++) {
      title = catalogs[i].innerText || catalogs[i].textContent
      tagName = catalogs[i].tagName
      id = 'heading-' + i
      catalogs[i].id = id
      treeItem = {
        name: title,
        tagName: tagName,
        id: id,
        level: +getLevel(tagName),
        parent: parentItem
      }
      if (lastTreeItem) {
        if (getLevel(treeItem.tagName) > getLevel(lastTreeItem.tagName)) {
          treeItem.parent = lastTreeItem
        } else {
          treeItem.parent = findParent(treeItem, lastTreeItem)
        }
      }
      lastTreeItem = treeItem
      tree.push(treeItem)
    }
    return tree
  }

  /**
   * 找到当前节点的父级
   * @param currTreeItem
   * @param lastTreeItem
   * @returns {*|Window}
   */
  function findParent(currTreeItem, lastTreeItem) {
    let lastTreeParent = lastTreeItem.parent
    while (lastTreeParent && (getLevel(currTreeItem.tagName) <= getLevel(lastTreeParent.tagName))) {
      lastTreeParent = lastTreeParent.parent
    }
    return lastTreeParent || {
      id: -1
    }
  }

  /**
   *  获取等级
   * @param tagName
   * @returns {*}
   */
  function getLevel(tagName) {
    return tagName ? tagName.slice(1) : 0
  }

  /**
   * 生成DOM树
   * @param tree
   * @param _parent
   * @return {string}
   */
  function generateHtmlTree(tree, _parent) {
    let ul, hasChild = false
    if (tree) {
      ul = `<ul>`
      for (let i = 0; i < tree.length; i++) {
        if (isEqual(tree[i].parent, _parent)) {
          hasChild = true
          ul += `<li><div title= '${tree[i].name}' class='${ Opt.linkClass } cl-level-${ tree[i].level }'  ${Opt.datasetName}='${ tree[i].id }'>${tree[i].name}</div>`
          ul += generateHtmlTree(tree, tree[i])
          ul += '</li>'
        }
      }
      ul += `</ul>`
    }
    return hasChild ? ul : ''
  }

  /**
   * 判断是否是相同节点
   */
  function isEqual(node, node2) {
    return node && node2 && typeof node === 'object' && typeof node2 === 'object' && node.id === node2.id
  }

  /**
   *  设置选中的项
   */
  function setActiveItem(id) {
    let catas = [...$catalog.querySelectorAll(`[${Opt.datasetName}]`)]

    catas.forEach(T => {
      if (T.getAttribute(Opt.datasetName) === id) {
        typeof Opt.activeHook === 'function' &&
          !T.classList.contains(Opt.linkActiveClass) &&
          Opt.activeHook.call(this, T)
        T.classList.add(Opt.linkActiveClass)
      } else {
        T.classList.remove(Opt.linkActiveClass)
      }
    })
  }
}
