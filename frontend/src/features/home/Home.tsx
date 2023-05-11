import { memo, type VFC } from 'react';
import { Text } from '@chakra-ui/react';
import { BorderedBox } from 'components/box/BorderedBox';
import { ContentLayout } from 'components/layouts/ContentLayout';

export const Home: VFC = memo(() => {
  return (
    <ContentLayout title="HOME">
      <BorderedBox p="24px">
        <Text fontSize="2xl">ようこそ人間ドック受付アプリへ！</Text>
        <br />
        <p>
          このアプリケーションは、健康保険加入者の人間ドックの予約を管理するためのものです。
          <br />
          被保険者情報と予約枠情報をCSVでインポートし、各被保険者の予約の登録・変更・削除を行うことができます。
          <br />
          また、予約が一通り終わったあとは、予約情報をCSVファイルでエクスポートすることができます。
        </p>
      </BorderedBox>
    </ContentLayout>
  );
});
