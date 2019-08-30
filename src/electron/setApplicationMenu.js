import { Menu, Tray } from 'electron'
import path from 'path'
const isMac = process.platform === 'darwin'
const setApplicationMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: '查看',
      submenu: [
        { label: '刷新', accelerator: 'F5', role: 'reload' },
        { label: '强制刷新', accelerator: 'Ctrl+F5', role: 'forcereload' },
        {
          label: '切换开发者工具',
          accelerator: isMac ? 'Alt+Command+I' : 'F12',
          role: 'toggledevtools'
        },
        { type: 'separator' },
        {
          label: '重置',
          role: 'resetzoom'
        },
        {
          label: '放大',
          role: 'zoomin'
        },
        {
          label: '缩小',
          role: 'zoomout'
        },
        { type: 'separator' },
        {
          label: '切换全屏',
          accelerator: isMac ? 'Ctrl+Command+F' : 'F11',
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: '窗口',
      role: 'window',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+W',
          role: isMac ? 'close' : 'quit'
        }
      ]
    }
  ])
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      role: isMac ? 'close' : 'quit'
    }
  ])
  const appTray = new Tray(path.join(__dirname, './icon.ico'))

  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip('720t')
  appTray.setContextMenu(contextMenu)

  Menu.setApplicationMenu(menu)
}

export default setApplicationMenu
