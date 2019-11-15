<template>
  <div class="fit">
    <banner
      title="Golang SP"
      :styles="{
        backgroundImage: 'url(https://media.licdn.com/dms/image/C4E1BAQGgg4B7t6Hrgg/company-background_10000/0?e=2159024400&v=beta&t=9kDTQVarrDEN0k8Zg7qmqnbGQZqP6liZshNAIyN2mO4)',
        backgroundPosition: '50% 50%',
      }"
      sub-title="Grupo de usuários de Golang de São Paulo"
      additional-info="2135 gophers" />
    <group-description-tabs
      :events="eventList"
      about='<p>Somos a comunidade Go de São Paulo.<br><br>Somos uma comunidade para pessoas interessada em Go (<a class="link" href="http://www.golangbr.org" title="www.golangbr.org" target="">www.golangbr.org</a>) e temos como objetivo principal organizar encontros mensais em São Paulo/Brasil e disseminar cada vez mais a liguagem Go junto a comunidade.<br><br>C4P: <a class="link" href="http://bit.ly/palestras-golangsp" title="http://bit.ly/palestras-golangsp" target="">http://bit.ly/palestras-golangsp</a><br><br>YouTube: <a class="link" href="https://www.youtube.com/c/GolangSP" title="https://www.youtube.com/c/GolangSP" target="">https://www.youtube.com/c/GolangSP</a><br>Slack Invite: <a class="link" href="https://invite.slack.golangbridge.org/" title="https://invite.slack.golangbridge.org/" target="">https://invite.slack.golangbridge.org/</a><br>Twitter: <a class="link" href="https://twitter.com/golang_sp" title="https://twitter.com/golang_sp" target="">https://twitter.com/golang_sp</a><br>Instagram: <a class="link" href="https://www.instagram.com/golang_sp/" title="https://www.instagram.com/golang_sp/" target="">https://www.instagram.com/golang_sp/</a></p>'
    />
    <custom-footer />
  </div>
</template>

<script>
import Banner from '../../components/Banner';
import GroupDescriptionTabs from '../../components/GroupDescriptionTabs';
import CustomFooter from '../../components/CustomFooter';
import { eventList } from '../../mock/event';

export default {
  name: 'GroupDetail',
  components: { Banner, GroupDescriptionTabs, CustomFooter },
  data: () => ({
    eventList,
  }),
};
</script>
