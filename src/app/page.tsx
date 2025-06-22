'use client'

import React from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Input,
  Layout,
  Popover,
  Space,
  Typography
} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {purple, blue} from '@ant-design/colors'

export default function Home() {
  const [url, setUrl] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [copyError, setCopyError] = React.useState<string | null>(null);
  const [unshortenedUrl, setUnshortenedUrl] = React.useState<string>('');
  const [autoCopy, setAutoCopy] = React.useState<boolean>(true);

  const {Compact} = Space;
  const {Text, Paragraph} = Typography;
  const {Header, Footer, Content} = Layout;

  const transformUrl = (url: string) => {
    setIsError(false)
    setCopyError(null)
    setIsCopied(false)

    if (url.includes("youtube.com/shorts/")) {
      const videoId = url.split("/shorts/")[1].split("?")[0];
      const result = `https://youtube.com/watch/?v=${videoId}`;
      setUnshortenedUrl(result)

      if (autoCopy) {
        navigator.clipboard
          .writeText(result)
          .then(() => setIsCopied(true))
          .catch((e) => setCopyError(e))
      }

      return
    }

    if (url.length === 0) {
      return setUnshortenedUrl('')
    }

    setIsError(true);
    setUnshortenedUrl('Input is not a YouTube Shorts URL')
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    transformUrl(e.target.value)
  }

  const paste = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text)
      transformUrl(text)
    })
  }

  const popover = (
    <div style={{maxWidth: 400}}>
      <Paragraph>
        I needed it to share my lifting videos with my coach for form checks.
        Shorts are convenient for quick upload, but not so much for review.
      </Paragraph>
      <Paragraph>
        If you leave the checkbox below checked, the result will be
        automatically copied to your clipboard, so you can paste it straight
        into
        your messenger or whatever.
      </Paragraph>
    </div>
  )

  return (
    <Layout style={{width: '100%', height: '100%'}}>
      <Header style={{
        color: 'white',
        backgroundColor: blue.primary,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        height: 'auto',
        minHeight: 64,
      }}>
        YouTube UnShortener
      </Header>
      <Content style={{
        padding: 24
      }}>
        <Flex style={{width: '100%', height: '100%'}} justify={'center'}
              align={'center'}>
          <Space direction={'vertical'} style={{textAlign: 'center'}}>

            <Text type={'secondary'}>
              Enter a short YouTube video URL and get a
              link to the same video as a regular (not short) one.
            </Text>
            <Popover content={popover}>
              <Button type="dashed" shape="round"
                      icon={<QuestionCircleOutlined/>}>
                What? Why?
              </Button>
            </Popover>

            <Compact>
              <Input
                placeholder="Short video URL" value={url}
                allowClear
                onChange={onInputChange}
                status={
                  isError ? 'error' : undefined
                }
              />
              <Button type="primary" onClick={paste}>Paste URL</Button>
            </Compact>
            <Checkbox
              checked={autoCopy}
              onChange={() => setAutoCopy(!autoCopy)}
            >
              <Text italic type={'secondary'}>Auto-copy result to
                clipboard</Text>
            </Checkbox>
            <Space direction={'vertical'}>
              {
                isError && <Text
                  type="danger">Error: {unshortenedUrl}</Text>
              }
              {!isError && unshortenedUrl && (
                <div>
                  <Text type={'secondary'}>Unshortened URL:</Text>
                  <br/>
                  <Text copyable>{unshortenedUrl}</Text>
                </div>
              )
              }
              {
                isCopied && <Text type="success">Copied to clipboard!</Text>
              }
              {
                copyError && <Text type="danger">
                  Please copy the result manually, clipboard error: {copyError}
                </Text>
              }
            </Space>
          </Space>
        </Flex>
      </Content>
      <Footer style={{textAlign: 'center'}}>
        <Text type={'secondary'}>v1.1.0 by Cap with</Text> 💙
      </Footer>
    </Layout>
  );
}
