// useState 用于管理评论列表数据
import { useState, useRef } from 'react'
// 导入 css 文件
import '@/css/App.scss'
// 导入 lodash 库，用于排序
import _ from 'lodash'
// 导入 classnames 库，用于动态添加 className
import classNames from 'classnames'

// 模拟评论区数据
const defaultList = [
    {
        id: 1,
        uid: 30001,
        user: 'John',
        avatar: "https://picture.devops-engineer.com.cn/file/03b8c4eedb2680507df79.jpg",
        like: 300,
        message: 'Hello React!!!',
        timestamp: '2024-07-01',
    },
    {
        id: 2,
        uid: 30002,
        user: 'Jane',
        avatar: "https://picture.devops-engineer.com.cn/file/9efc09026999709599861.jpg",
        like: 170,
        message: 'Oh!, I am learning React!',
        timestamp: '2024-08-11',
    },
    {
        id: 3,
        uid: 30003,
        user: 'Tom',
        avatar: "https://picture.devops-engineer.com.cn/file/0ced8b02079200e57ca4e.jpg",
        like: 230,
        message: 'React is awesome!',
        timestamp: '2024-07-30',
    }
]
// 模拟当前用户数据
const currentUser = {
    id: 1,
    uid: 30001,
    user: 'John',
    avatar: "https://picture.devops-engineer.com.cn/file/03b8c4eedb2680507df79.jpg",
}
// 两种排序类型
const tabs = [
    { type: 'time', text: '最新' },
    { type: 'hot', text: '最热' }
]

function App() {
    // 解构赋值
    const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'timestamp', 'desc'))
    const [type, setType] = useState('time')
    const [content, setContent] = useState('')
    const inputRef = useRef(null)

    // 删除评论的逻辑（模拟删除）
    const handleDelete = (id) => {
        setCommentList(commentList.filter(item => item.id !== id))
    }

    // 点赞评论的逻辑
    const handleTabChange = (type) => {
        setType(type)
        if (type === 'hot') {
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        } else if (type === 'time') {
            setCommentList(_.orderBy(commentList, 'timestamp', 'desc'))
        }
    }

    // 发布评论的逻辑
    const handleSend = () => {
        // 输入为空时不发布
        if (content.trim() === '') return

        // 创建新的评论对象
        const newCommentItem = {
            id: commentList.length + 1,
            uid: currentUser.uid,
            user: currentUser.user,
            avatar: currentUser.avatar,
            like: 0,
            message: content,
            timestamp: new Date().toISOString().split('T')[0], // 使用当前日期
        }

        // 更新评论列表
        const updatedList = [...commentList, newCommentItem]

        // 根据当前排序类型进行排序
        const sortedList = type === 'hot' ? _.orderBy(updatedList, 'like', 'desc') : _.orderBy(updatedList, 'timestamp', 'desc')

        // 更新评论列表状态
        setCommentList(sortedList)

        // 清空输入框
        setContent('')

        // 聚焦输入框
        inputRef.current.focus()
    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{commentList.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名：active */}
                        {tabs.map(item => <span
                            className={classNames('nav-item', { active: type === item.type })}
                            key={item.type}
                            onClick={() =>handleTabChange(item.type)}>
                            {item.text}
                        </span> )}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={currentUser.avatar} alt="用户头像"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="发一条友善的评论"
                            // 绑定输入框
                            ref={inputRef}
                            // 绑定输入框值
                            value={content}
                            // 绑定输入框状态
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send">
                            {/* 点击触发发布逻辑 */}
                            <div className="send-text" onClick={handleSend}>发布</div>
                        </div>
                    </div>
                </div>
                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => (
                        <div className="reply-item" key={item.id}>
                            {/* 头像 */}
                            <div className="root-reply-avatar">
                                <div className="bili-avatar">
                                    <img
                                        className="bili-avatar-img"
                                        alt=""
                                        src={item.avatar}
                                    />
                                </div>
                            </div>

                            <div className="content-wrap">
                                {/* 用户名 */}
                                <div className="user-info">
                                    <div className="user-name">{item.user}</div>
                                </div>
                                {/* 评论内容 */}
                                <div className="root-reply">
                                    <span className="reply-content">{item.message}</span>
                                    <div className="reply-info">
                                        {/* 评论时间 */}
                                        <span className="reply-time">{item.timestamp}</span>
                                        {/* 评论数量 */}
                                        <span className="reply-time">点赞数: {item.like}</span>
                                        {/* 删除按钮 */}
                                        {currentUser.uid === item.uid && <span className="delete-btn" onClick={() => handleDelete(item.id)}>删除</span> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App