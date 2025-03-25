'use client'

import React from 'react';
import {Button, Flex, Input, Layout, Space, Typography} from "antd";

export default function Home() {
    const [url, setUrl] = React.useState<string>('');
    const [unshortenedUrl, setUnshortenedUrl] = React.useState<string>('');

    const transformUrl = (url: string) => {
        if (url.includes("youtube.com/shorts/")) {
            const videoId = url.split("/shorts/")[1].split("?")[0];
            setUnshortenedUrl(`https://youtube.com/watch/?v=${videoId}`)
        } else if (url.length === 0) {
            setUnshortenedUrl('')
        } else {
            setUnshortenedUrl('Input is not a YouTube Shorts URL')
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
        transformUrl(e.target.value)
    }
    const paste = () => {
        navigator.clipboard.readText().then((text) => {
                setUrl(text)
                transformUrl(text)
            }
        )
    }

    return (
        <Layout style={{padding: '24px', width: '100%', height: '100%'}}>
            <Flex style={{width: '100%', height: '100%'}} justify={'center'}
                  align={'center'}>
                <Space direction={'vertical'}>
                    <Space>
                        <Input
                            placeholder="Short video URL" value={url}
                            allowClear
                            onChange={onInputChange}/>
                        <Button type="primary" onClick={paste}>Paste
                            Url</Button>
                    </Space>
                    <Space>
                        <Typography.Text>Unshortened URL:</Typography.Text>
                        <Typography.Text
                            copyable>{unshortenedUrl}</Typography.Text>
                    </Space>
                </Space>
            </Flex>
        </Layout>
    );
}
