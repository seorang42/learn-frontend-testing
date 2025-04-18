// it, test의 묶음
describe("테스트하고자 하는 컴포넌트", () => {
  // 전체 테스트케이스 이전에 한 번만 실행됨
  beforeAll(() => {
    console.log("beforeAll");
  });

  // 각각의 테스트케이스가 실행되기 전 실행됨
  beforeEach(() => {
    console.log("beforeEach");
  });

  // 영어로 테스트 코드 작성 시 it이 가독성이 좋음
  it("should test component A", () => {
    console.log("it");
  });

  // 한글로 테스트 코드 작성 시 test가 가독성이 좋음
  test("테스트케이스 1번, 00를 테스트한다", () => {
    console.log("test");
  });

  // 각각의 테스트케이스가 실행된 후 실행됨
  afterEach(() => {
    console.log("afterEach");
  });

  // 모든 테스트케이스가 실행된 후 실행됨
  afterAll(() => {
    console.log("afterAll");
  });
});

// 실행 결과
// beforeAll -> beforeEach -> it -> beforeEach -> test
