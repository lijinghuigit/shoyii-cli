<template>
	<view class="" style="flex: 1;overflow: auto;height: 100%;" @click.stop="closeMore">
		<scroll-view class="section" scroll-y="true"
		@scrolltolower='toupper' :scroll-top='scrollTop' @scroll="scroll">
			<view class="section-item">
				<!-- lastestChat.length-index -->
				<view v-for="(item,index) in lastestChat" :key='item.id' class="list_item"> 
					<!-- <text class="time" v-if="lastestChat.length  > index+1?lastestChat[index+1].sendTime < (item.sendTime - 300000) : true">{{relativtime(item.sendTime)}}</text> -->
					<!-- 每一项的比较都不会比较index==0这一项，除非index=0时，会跟自身比较下；而且index==length-1这一项还不做遍历-->
					<text class="time" v-if="index < lastestChat.length-1 && (item.sendTime -  lastestChat[index + 1].sendTime) > 300000">{{relativtime(item.sendTime)}}</text>
					<!-- <text class="time" v-if="index-1 >= 0 ? lastestChat[index-1].sendTime < item.sendTime - 300000 : true">{{relativtime(item.sendTime)}}</text> -->
					<view class="chatlist" :class="item.userId==userId?'alluser':'allother'">
						<image class='image' lazy-load	mode='aspectFit'
						:src="item.userProfile?item.userProfile:'/static/image/person.png'"></image>
						<view class="chatlist_box">
							<!-- 群组且非自身 -->
							<text class="item" v-if="type=='GROUP'&&item.userId!=userId">
								{{item.userName}}
							</text>
							<view style="color: #000000;max-width: 500rpx;"
							 :class="item.userId==userId?'userCord':'otherCord'">
								<!-- 文本信息 -->
								<view :class="item.userId==userId?'TextuserCord':'TextotherCord'" v-if="item.msgType=='1'">
									<text selectable='true'>{{item.content}}</text>
								</view>
								<!-- 方法库数据 -->
								<view @click="enterDetail(item)" class="surgicalCode" v-if="item.msgType=='3'">
									<view class="s_header" style="">
										<text>{{JSON.parse(item.content).surgicalPlanName}}</text>
									</view>
									<view class="s_section" style="">
										<text class="content" style="">{{JSON.parse(item.content).title}}</text>
										<image lazy-load class="image" v-if="JSON.parse(item.content).previewImage" :src="JSON.parse(item.content).previewImage" mode="aspectFit"></image>
										<image lazy-load class="image" v-else src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
									</view>
									<view class="s_footer" style="">
										<image lazy-load class="image" style="" src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
										<text class="name">{{JSON.parse(item.content).doctorName}}</text>
									</view>
								</view>
								<!-- 图片 -->
								<view class="cordimages" v-if="item.msgType=='2'" @click="previewImage(item)">
									<u-image class="chatimage" height="300rpx" :src="item.content" 
									mode="aspectFill"></u-image>
								</view>
								<view class="cordfile" v-if="item.msgType=='4'" @click="openFile(item)">
									<view class="title" style="">
										<text>{{JSON.parse(item.content).name}}</text>
									</view> 
									<view class="" v-if="filesuffix(item)=='mp3'">
										<u-icon name="play-circle-fill" size='100' color='#86B0D4'></u-icon>
									</view>
									<view class=""
										  v-else-if="filesuffix(item)=='pdf'||filesuffix(item)=='zip'||filesuffix(item)=='docx'">
										<u-icon name="file-text-fill" size='100' color='#fa3534'></u-icon>
									</view>
									<view class="" v-else>
										<u-icon name="file-text-fill" size='100' color='#999'></u-icon>
									</view>
								</view>
								<view class="surgicalCode" v-if="item.msgType=='5'" @click="CaseDetail(item)">
									<view class="s_header" style="">
										<text>{{JSON.parse(item.content).name||JSON.parse(item.content).caseHistoryNo||'暂无数据'}}</text>
									</view>
									<view class="s_section" style="">
										<text class="content" style="">{{JSON.parse(item.content).title||'暂无数据'}}</text>
										<image lazy-load class="image" v-if="JSON.parse(item.content).previewImage" :src="JSON.parse(item.content).previewImage" mode="aspectFit"></image>
										<image lazy-load class="image" v-else src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
									</view>
									<view class="s_footer">
										<image lazy-load class="image" src="/static/image/shoyiilogo.png" mode="aspectFit"></image>
										<text class="name">树蚁医疗</text>
									</view>
								</view>
								<!-- 语音 -->
								<template v-if="item.msgType == '6'">
									<div class="audio_box" :class="item.userId==userId?'TextuserCord':'TextotherCord'"
									style="display: flex;align-items: center;" @click="playAudio(item,index)">
										<text class="content_box" style="text-align: left;">
											{{JSON.parse(item.content).time}}''
										</text>
										<!-- :style="{transform:item.userId==userId?'rotate(180deg)':''}" -->
										<uni-icons class='audio_img' custom-prefix="iconfont" :type="payAudioIndex==index?'iconshengyin':'iconshengyin1'" size="24" color="#000"
										style="margin-left: 5rpx;margin-right: 5rpx;transform:rotate(180deg)"
										></uni-icons>
									</div>
								</template> 
							</view>
						</view> 
					</view> 
				</view>
			</view>
			<u-loadmore :status="status" :is-dot='true' :load-text="loadText" class='loadtext'/>
		</scroll-view>
	</view>
</template>

<script>
</script>

<style>
</style>