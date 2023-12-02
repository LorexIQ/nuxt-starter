<script setup lang="ts">
const redactorRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLDivElement>();

interface RedactorData {
  startX: number;
  startY: number;
  x: number;
  y: number;
}

const mousePos = reactive({
  isDrag: false,
  dragStartX: 0,
  dragStartY: 0,
  x: 0,
  y: 0
});
const redactorData = reactive<RedactorData>({
  startX: 0,
  startY: 0,
  x: 0,
  y: 0
});

watch([() => redactorData.x, () => redactorData.y], value => {
  const { width, height, windowWidth, windowHeight } = getCanvasMeta();

  if (value[0] < 0) redactorData.x = 0;
  if (value[1] < 0) redactorData.y = 0;
  if (value[0] > width - windowWidth) redactorData.x = width - windowWidth;
  if (value[1] > height - windowHeight) redactorData.y = height - windowHeight;

  redactorRef.value?.scrollTo(value[0], value[1]);
});

onMounted(() => {
  const { width, height, windowWidth, windowHeight } = getCanvasMeta();

  redactorData.x = width / 2 - windowWidth / 2;
  redactorData.y = height / 2 - windowHeight / 2;
});

function canvasMoveStart(event: Event) {
  const target = event.target as HTMLDivElement;

  mousePos.isDrag = true;
  mousePos.dragStartX = mousePos.x;
  mousePos.dragStartY = mousePos.y;
  redactorData.startX = redactorData.x;
  redactorData.startY = redactorData.y;
}
function canvasMoving() {
  console.log('moving')
  redactorData.x = redactorData.startX - (mousePos.x - mousePos.dragStartX);
  redactorData.y = redactorData.startY - (mousePos.y - mousePos.dragStartY);
}
function canvasMoveEnd() {
  mousePos.isDrag = false;
}

function getCanvasMeta() {
  const { width, height } = canvasRef.value?.getBoundingClientRect()!;
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  return {
    width,
    height,
    windowWidth,
    windowHeight
  };
}
function saveMousePosition(event: MouseEvent) {
  mousePos.x = event.clientX;
  mousePos.y = event.clientY;
}

class RectRoom {
  x: number;
  y: number;
  width: number;
  height: number;
  wallWidth = 20;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
</script>

<template>
  <div
      class="redactor"
      ref="redactorRef"
      @mousemove="saveMousePosition"
  >
    <div
        class="redactor__canvas"
        ref="canvasRef"
        @mousedown="canvasMoveStart"
        @mousemove="mousePos.isDrag && canvasMoving()"
        @mouseup="canvasMoveEnd"
        @mouseleave="canvasMoveEnd"
    >
      <div class="redactor__meta" style="top: 100px; left: 200px">asjdpjaposjdpoa aspdjp[asj p[oasdj[a [=as</div>
    </div>
    <div class="redactor__meta">
      <div>DATA: {{ redactorData }}</div>
      <div>MOUSE: {{ mousePos }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.redactor {
  position: relative;
  width: 100vw;
  height: 100%;
  max-height: 100%;
  overflow: auto;

  &__canvas {
    position: relative;
    width: 10000px;
    height: 10000px;
    background: repeating-linear-gradient(transparent,transparent 20px, rgba(85, 87, 92, 0.3) 22px),
      repeating-linear-gradient(90deg, transparent,transparent 20px, rgba(85, 87, 92, 0.3) 22px);

    & > div {
      position: absolute;
    }
    & * {
      user-select: none;
    }
  }
  &__meta {
    position: fixed;
    right: 0;
    top: 0;
    width: 400px;
    padding: 20px;
    border: 1px solid;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
