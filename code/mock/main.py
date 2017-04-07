#!/usr/bin/env python

import argparse
import jsog
import json
import random
import requests
import time


API_URL = 'http://localhost:8080/ubm-backend/v1'


def get_request(url):
    r = requests.get(url)

    return r.json()


def post_request(url, data):
    headers = {'Content-type': 'application/json'}
    r = requests.post(url, data=json.dumps(data), headers=headers)

    return r.json()


def put_request(url, data):
    headers = {'Content-type': 'application/json'}
    r = requests.put(url, data=json.dumps(data), headers=headers)

    return r.json()


def delete_request(url):
    return requests.delete(url)


def get_pages(graph_id):
    url = '{api}/applications/{graph_id}/pages'.format(
        api=API_URL,
        graph_id=graph_id
    )

    return get_request(url)


def add_page(graph_id, name, extra={}):
    url = '{api}/applications/{graph_id}/pages'.format(
        api=API_URL,
        graph_id=graph_id
    )
    data = {
        'name': name,
        'extra': extra
    }

    return jsog.decode(post_request(url, data))


def add_visit(graph_id, action, count, start_page, end_page):
    url = '{api}/applications/{graph_id}/visits'.format(
        api=API_URL,
        graph_id=graph_id
    )
    data = {
        'action': action,
        'count': count,
        'start': start_page,
        'end': end_page,
    }

    return jsog.decode(post_request(url, data))


def delete_visit(graph_id, visit_id):
    url = '{api}/applications/{graph_id}/visits/{visit_id}'.format(
        api=API_URL,
        graph_id=graph_id,
        visit_id=visit_id
    )

    return delete_request(url)


def delete_page(graph_id, page_id):
    url = '{api}/applications/{graph_id}/pages/{page_id}'.format(
        api=API_URL,
        graph_id=graph_id,
        page_id=page_id
    )

    return delete_request(url)


def start_mock(graph_id):
    print('Sending sample data to graph #{}'.format(graph_id))
    pages = get_pages(graph_id)
    random_page = pages[random.randrange(0, len(pages))]
    time.sleep(10)

    # Add one page and connect it
    page_1 = add_page(
        graph_id,
        'Cart.ViewCart',
        {'Product Count': '100', 'Key 1': 'Value 1', 'Key 2': 'Value 2'}
    )
    add_visit(graph_id, 'viewCart', 100, random_page, page_1)
    time.sleep(10)

    # Add another page and connect it
    page_2 = add_page(graph_id, 'Page.AGB')
    add_visit(graph_id, 'viewAGB', 50, page_1, page_2)
    time.sleep(10)

    # Connect it again
    add_visit(graph_id, 'viewAGB', 25, page_2, random_page)

    print('Done.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Mock service for user behavior models'
    )
    parser.add_argument('graph_id', metavar='id', type=int,
                        help='ID of the graph')

    args = parser.parse_args()
    start_mock(args.graph_id)
