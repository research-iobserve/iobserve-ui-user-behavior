// @flow

const applications = [
  {id: '123', name: '123 Application'},
  {id: '456', name: '456 Application'},
];

export default function request(url: string) {
  return new Promise(resolve => {
    process.nextTick(
      () => resolve(applications)
    );
  });
}
