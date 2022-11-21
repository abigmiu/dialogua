// 创建章节 provider
import { provide, reactive, ref } from 'vue'
import { sectionActionType } from '@/constant/index'
import { ISection } from '@/types/Dialog'

const sectionId = ref(0)
const chapterId = ref(0)
const bookId = ref(0)
const sectionAction = ref(sectionActionType.edit)
const sections = reactive<ISection[]>([])


provide('sectionId', sectionId);
provide('chapterId', chapterId);
provide('bookId', bookId);
provide('sectionAction', sectionAction);
